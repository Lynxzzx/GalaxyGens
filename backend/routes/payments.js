const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const User = require('../models/User');
const Plan = require('../models/Plan');
const { protect } = require('../middleware/auth');

// Configurar Mercado Pago (API v2)
let client = null;
let paymentClient = null;

if (process.env.MERCADOPAGO_ACCESS_TOKEN && process.env.MERCADOPAGO_ACCESS_TOKEN !== 'seu_token_mercadopago_aqui') {
  client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 }
  });
  paymentClient = new Payment(client);
}

// @route   POST /api/payments/create-pix
// @desc    Criar pagamento PIX (QR Code + Copia e Cola)
// @access  Private
router.post('/create-preference', protect, async (req, res) => {
  try {
    const { planId } = req.body;

    console.log('💳 Criando pagamento PIX para plano:', planId);
    console.log('👤 Usuário:', req.user.username);

    const plan = await Plan.findById(planId);
    if (!plan) {
      console.log('❌ Plano não encontrado:', planId);
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    if (!plan.isActive) {
      console.log('❌ Plano inativo:', plan.name);
      return res.status(400).json({ message: 'Plano não está disponível' });
    }

    if (!paymentClient) {
      console.log('❌ Mercado Pago não configurado!');
      return res.status(500).json({ 
        message: 'Sistema de pagamentos não configurado. Entre em contato com o suporte.' 
      });
    }

    console.log('✅ Criando pagamento PIX no Mercado Pago...');

    // Criar pagamento PIX
    const paymentData = {
      transaction_amount: plan.price,
      description: `${plan.name} - ${plan.duration} dias`,
      payment_method_id: 'pix',
      payer: {
        email: `${req.user.username}@galaxygens.com`,
        first_name: req.user.username,
        last_name: 'User'
      },
      external_reference: JSON.stringify({
        userId: req.user._id.toString(),
        planId: plan._id.toString(),
        duration: plan.duration
      })
    };

    // Adicionar notification_url apenas se for uma URL pública válida
    // Para desenvolvimento local, configure com ngrok ou remova o webhook
    if (process.env.BACKEND_URL && !process.env.BACKEND_URL.includes('localhost')) {
      paymentData.notification_url = `${process.env.BACKEND_URL}/api/payments/webhook`;
    }

    const response = await paymentClient.create({ body: paymentData });
    
    console.log('✅ Pagamento PIX criado com sucesso!');
    console.log('ID:', response.id);
    console.log('Status:', response.status);

    // Extrair informações do PIX
    const pixInfo = response.point_of_interaction?.transaction_data;
    
    res.json({
      id: response.id,
      status: response.status,
      qr_code: pixInfo?.qr_code, // QR Code base64
      qr_code_base64: pixInfo?.qr_code_base64, // QR Code base64 puro
      ticket_url: pixInfo?.ticket_url, // Link do ticket
      qr_code_text: pixInfo?.qr_code, // Pix Copia e Cola
      expiration_date: response.date_of_expiration
    });
  } catch (error) {
    console.error('❌ Erro ao criar pagamento PIX:', error);
    console.error('Detalhes:', error.message);
    if (error.cause) {
      console.error('Causa:', JSON.stringify(error.cause, null, 2));
    }
    
    res.status(500).json({ 
      message: 'Erro ao criar pagamento PIX', 
      error: error.message 
    });
  }
});

// @route   GET /api/payments/check/:paymentId
// @desc    Verificar status de um pagamento manualmente
// @access  Private
router.get('/check/:paymentId', protect, async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentClient) {
      return res.status(500).json({ message: 'Sistema de pagamentos não configurado' });
    }

    console.log('🔍 Verificando pagamento:', paymentId);

    const payment = await paymentClient.get({ id: paymentId });

    console.log('Status:', payment.status);
    console.log('Status Detail:', payment.status_detail);

    // Se o pagamento foi aprovado, ativar o plano
    if (payment.status === 'approved') {
      const externalReference = JSON.parse(payment.external_reference);
      const { userId, duration } = externalReference;

      // Verificar se é o usuário correto
      if (userId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Pagamento não pertence a este usuário' });
      }

      // Adicionar tempo ao usuário
      const user = await User.findById(userId);
      if (user) {
        const currentExpiry = user.planExpiry && user.planExpiry > new Date() 
          ? new Date(user.planExpiry) 
          : new Date();
        
        user.planExpiry = new Date(currentExpiry.getTime() + duration * 24 * 60 * 60 * 1000);
        await user.save();

        console.log('✅ Plano ativado para usuário:', user.username);

        return res.json({
          status: 'approved',
          message: 'Plano ativado com sucesso!',
          planExpiry: user.planExpiry
        });
      }
    }

    res.json({
      status: payment.status,
      status_detail: payment.status_detail,
      message: payment.status === 'pending' 
        ? 'Aguardando pagamento...' 
        : 'Pagamento não aprovado'
    });
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    res.status(500).json({ message: 'Erro ao verificar pagamento', error: error.message });
  }
});

// @route   POST /api/payments/webhook
// @desc    Webhook do Mercado Pago
// @access  Public
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('🔔 Webhook recebido:', type);

    if (type === 'payment') {
      const paymentId = data.id;
      
      if (paymentClient) {
        const payment = await paymentClient.get({ id: paymentId });

        console.log('💳 Pagamento ID:', paymentId);
        console.log('📊 Status:', payment.status);

        if (payment.status === 'approved') {
          const externalReference = JSON.parse(payment.external_reference);
          const { userId, duration } = externalReference;

          // Adicionar tempo ao usuário
          const user = await User.findById(userId);
          if (user) {
            const currentExpiry = user.planExpiry && user.planExpiry > new Date() 
              ? new Date(user.planExpiry) 
              : new Date();
            
            user.planExpiry = new Date(currentExpiry.getTime() + duration * 24 * 60 * 60 * 1000);
            await user.save();

            console.log('✅ Plano ativado automaticamente via webhook!');
            console.log('👤 Usuário:', user.username);
            console.log('📅 Válido até:', user.planExpiry);
          }
        }
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).send('Erro');
  }
});

module.exports = router;


