const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const { protect, isOwner } = require('../middleware/auth');

// @route   GET /api/plans
// @desc    Listar todos os planos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort('price');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar planos', error: error.message });
  }
});

// @route   GET /api/plans/:id
// @desc    Obter detalhes de um plano
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar plano', error: error.message });
  }
});

// @route   POST /api/plans
// @desc    Criar novo plano
// @access  Private (Owner)
router.post('/', protect, isOwner, async (req, res) => {
  try {
    const { name, description, duration, price, features } = req.body;

    const plan = await Plan.create({
      name,
      description,
      duration,
      price,
      features: features || []
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar plano', error: error.message });
  }
});

// @route   PUT /api/plans/:id
// @desc    Atualizar plano
// @access  Private (Owner)
router.put('/:id', protect, isOwner, async (req, res) => {
  try {
    const { name, description, duration, price, features, isActive } = req.body;

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { name, description, duration, price, features, isActive },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar plano', error: error.message });
  }
});

// @route   DELETE /api/plans/:id
// @desc    Deletar plano
// @access  Private (Owner)
router.delete('/:id', protect, isOwner, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }
    res.json({ message: 'Plano deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar plano', error: error.message });
  }
});

module.exports = router;



