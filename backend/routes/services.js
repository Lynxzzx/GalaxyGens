const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const User = require('../models/User');
const { protect, isOwner, hasActivePlan } = require('../middleware/auth');

// @route   GET /api/services
// @desc    Listar todos os serviços
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).select('-accounts');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços', error: error.message });
  }
});

// @route   GET /api/services/:id
// @desc    Obter detalhes de um serviço
// @access  Private (Owner)
router.get('/:id', protect, isOwner, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviço', error: error.message });
  }
});

// @route   POST /api/services
// @desc    Criar novo serviço
// @access  Private (Owner)
router.post('/', protect, isOwner, async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    const service = await Service.create({
      name,
      description,
      icon: icon || '🎮'
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar serviço', error: error.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Atualizar serviço
// @access  Private (Owner)
router.put('/:id', protect, isOwner, async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, icon, isActive },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error: error.message });
  }
});

// @route   POST /api/services/:id/accounts
// @desc    Adicionar contas ao estoque
// @access  Private (Owner)
router.post('/:id/accounts', protect, isOwner, async (req, res) => {
  try {
    const { accounts } = req.body; // Array de strings "email:senha"

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    // Adicionar contas
    const newAccounts = accounts.map(acc => ({
      credentials: acc,
      isUsed: false
    }));

    service.accounts.push(...newAccounts);
    service.updateStock();
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar contas', error: error.message });
  }
});

// @route   DELETE /api/services/:id/accounts/:accountId
// @desc    Remover conta do estoque
// @access  Private (Owner)
router.delete('/:id/accounts/:accountId', protect, isOwner, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    service.accounts = service.accounts.filter(
      acc => acc._id.toString() !== req.params.accountId
    );
    service.updateStock();
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover conta', error: error.message });
  }
});

// @route   POST /api/services/:id/generate
// @desc    Gerar conta do serviço
// @access  Private (Com plano ativo)
router.post('/:id/generate', protect, hasActivePlan, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    if (!service.isActive) {
      return res.status(403).json({ message: 'Serviço desativado' });
    }

    // Buscar conta não utilizada
    const availableAccount = service.accounts.find(acc => !acc.isUsed);
    if (!availableAccount) {
      return res.status(404).json({ message: 'Sem contas disponíveis no estoque' });
    }

    // Marcar conta como usada
    availableAccount.isUsed = true;
    availableAccount.usedBy = req.user._id;
    availableAccount.usedAt = new Date();
    service.updateStock();
    await service.save();

    // Adicionar ao histórico do usuário
    const user = await User.findById(req.user._id);
    user.generatedAccounts.push({
      service: service._id,
      account: availableAccount.credentials,
      generatedAt: new Date()
    });
    await user.save();

    res.json({
      message: 'Conta gerada com sucesso!',
      service: service.name,
      account: availableAccount.credentials
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar conta', error: error.message });
  }
});

// @route   DELETE /api/services/:id
// @desc    Deletar serviço
// @access  Private (Owner)
router.delete('/:id', protect, isOwner, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar serviço', error: error.message });
  }
});

module.exports = router;



