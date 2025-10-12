const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

console.log('========================================');
console.log('  Teste do Mercado Pago SDK');
console.log('========================================\n');

const testMercadoPago = async () => {
  try {
    console.log('1. Verificando token...');
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!token || token === 'seu_token_mercadopago_aqui') {
      console.log('❌ Token não configurado!');
      console.log('Configure o MERCADOPAGO_ACCESS_TOKEN no arquivo .env');
      process.exit(1);
    }
    
    console.log('✅ Token encontrado:', token.substring(0, 20) + '...');
    console.log('');

    console.log('2. Inicializando SDK...');
    const client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000 }
    });
    console.log('✅ Cliente criado');
    console.log('');

    console.log('3. Criando cliente de preferência...');
    const preferenceClient = new Preference(client);
    console.log('✅ Cliente de preferência criado');
    console.log('');

    console.log('4. Testando criação de preferência...');
    const preference = {
      items: [
        {
          title: 'Teste - Plano Premium',
          description: 'Teste de integração com Mercado Pago',
          unit_price: 10.00,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'http://localhost:3000/payment/success',
        failure: 'http://localhost:3000/payment/failure',
        pending: 'http://localhost:3000/payment/pending'
      },
      auto_return: 'approved',
      external_reference: 'teste-123'
    };

    console.log('Dados da preferência:', JSON.stringify(preference, null, 2));
    console.log('');

    const response = await preferenceClient.create({ body: preference });
    
    console.log('✅ Preferência criada com sucesso!');
    console.log('');
    console.log('📊 Resposta:');
    console.log('ID:', response.id);
    console.log('Link de pagamento:', response.init_point);
    console.log('Sandbox:', response.sandbox_init_point);
    console.log('');
    console.log('========================================');
    console.log('  ✅ TESTE BEM-SUCEDIDO!');
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.log('');
    console.log('========================================');
    console.log('  ❌ ERRO NO TESTE');
    console.log('========================================');
    console.log('');
    console.log('Tipo:', error.name);
    console.log('Mensagem:', error.message);
    console.log('');
    
    if (error.cause) {
      console.log('Causa:', error.cause);
    }
    
    if (error.response) {
      console.log('Status HTTP:', error.response.status);
      console.log('Dados da resposta:', JSON.stringify(error.response.data, null, 2));
    }
    
    console.log('');
    console.log('Stack completo:');
    console.log(error.stack);
    console.log('');
    console.log('🔍 Possíveis causas:');
    console.log('1. Token inválido ou expirado');
    console.log('2. Token de teste sendo usado em produção');
    console.log('3. Problemas de rede/firewall');
    console.log('4. Formato incorreto dos dados');
    
    process.exit(1);
  }
};

testMercadoPago();


