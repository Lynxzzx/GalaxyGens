const express = require('express');
const router = express.Router();
const GiftCode = require('../models/GiftCode');
const User = require('../models/User');
const { protect, isOwner } = require('../middleware/auth');

// @route   GET /api/giftcodes
// @desc    Listar todos os gift codes
// @access  Private (Owner)
router.get('/', protect, isOwner, async (req, res) => {
  try {
    const giftCodes = await GiftCode.find()
      .populate('usedBy', 'username')
      .populate('createdBy', 'username')
      .sort('-createdAt');
    res.json(giftCodes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar gift codes', error: error.message });
  }
});

// @route   POST /api/giftcodes
// @desc    Criar novo gift code
// @access  Private (Owner)
router.post('/', protect, isOwner, async (req, res) => {
  try {
    const { code, duration } = req.body;

    // Verificar se código já existe
    const codeExists = await GiftCode.findOne({ code: code.toUpperCase() });
    if (codeExists) {
      return res.status(400).json({ message: 'Código já existe' });
    }

    const giftCode = await GiftCode.create({
      code: code.toUpperCase(),
      duration,
      createdBy: req.user._id
    });

    res.status(201).json(giftCode);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar gift code', error: error.message });
  }
});

// @route   POST /api/giftcodes/redeem
// @desc    Resgatar gift code
// @access  Private
router.post('/redeem', protect, async (req, res) => {
  try {
    const { code } = req.body;

    const giftCode = await GiftCode.findOne({ code: code.toUpperCase() });
    if (!giftCode) {
      return res.status(404).json({ message: 'Código inválido' });
    }

    if (giftCode.isUsed) {
      return res.status(400).json({ message: 'Código já foi utilizado' });
    }

    // Marcar como usado
    giftCode.isUsed = true;
    giftCode.usedBy = req.user._id;
    giftCode.usedAt = new Date();
    await giftCode.save();

    // Adicionar tempo ao usuário
    const user = await User.findById(req.user._id);
    const currentExpiry = user.planExpiry && user.planExpiry > new Date() 
      ? new Date(user.planExpiry) 
      : new Date();
    
    user.planExpiry = new Date(currentExpiry.getTime() + giftCode.duration * 24 * 60 * 60 * 1000);
    await user.save();

    res.json({
      message: `Código resgatado! ${giftCode.duration} dias adicionados ao seu plano.`,
      planExpiry: user.planExpiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resgatar código', error: error.message });
  }
});

// @route   DELETE /api/giftcodes/:id
// @desc    Deletar gift code
// @access  Private (Owner)
router.delete('/:id', protect, isOwner, async (req, res) => {
  try {
    const giftCode = await GiftCode.findByIdAndDelete(req.params.id);
    if (!giftCode) {
      return res.status(404).json({ message: 'Gift code não encontrado' });
    }
    res.json({ message: 'Gift code deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar gift code', error: error.message });
  }
});

module.exports = router;



