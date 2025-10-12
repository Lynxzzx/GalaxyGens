const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, isOwner } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Listar todos os usuários
// @access  Private (Owner)
router.get('/', protect, isOwner, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    const usersWithPlanStatus = users.map(user => ({
      ...user.toObject(),
      hasActivePlan: user.hasActivePlan()
    }));
    res.json(usersWithPlanStatus);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Obter detalhes de um usuário
// @access  Private (Owner)
router.get('/:id', protect, isOwner, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('generatedAccounts.service', 'name');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      ...user.toObject(),
      hasActivePlan: user.hasActivePlan()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
});

// @route   GET /api/users/me/history
// @desc    Obter histórico de contas geradas do usuário logado
// @access  Private
router.get('/me/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('generatedAccounts')
      .populate('generatedAccounts.service', 'name icon');
    
    res.json(user.generatedAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: error.message });
  }
});

// @route   PUT /api/users/:id/role
// @desc    Atualizar role de um usuário
// @access  Private (Owner)
router.put('/:id/role', protect, isOwner, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role inválida' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.role === 'owner') {
      return res.status(403).json({ message: 'Não é possível alterar role do owner' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: 'Role atualizada com sucesso',
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar role', error: error.message });
  }
});

// @route   PUT /api/users/:id/plan
// @desc    Atualizar plano de um usuário
// @access  Private (Owner)
router.put('/:id/plan', protect, isOwner, async (req, res) => {
  try {
    const { days } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const currentExpiry = user.planExpiry && user.planExpiry > new Date() 
      ? new Date(user.planExpiry) 
      : new Date();
    
    user.planExpiry = new Date(currentExpiry.getTime() + days * 24 * 60 * 60 * 1000);
    await user.save();

    res.json({
      message: `${days} dias adicionados ao plano do usuário`,
      user: {
        _id: user._id,
        username: user.username,
        planExpiry: user.planExpiry
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar plano', error: error.message });
  }
});

// @route   PUT /api/users/:id/toggle
// @desc    Ativar/Desativar usuário
// @access  Private (Owner)
router.put('/:id/toggle', protect, isOwner, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.role === 'owner') {
      return res.status(403).json({ message: 'Não é possível desativar o owner' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `Usuário ${user.isActive ? 'ativado' : 'desativado'} com sucesso`,
      user: {
        _id: user._id,
        username: user.username,
        isActive: user.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alternar status', error: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Deletar usuário
// @access  Private (Owner)
router.delete('/:id', protect, isOwner, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.role === 'owner') {
      return res.status(403).json({ message: 'Não é possível deletar o owner' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
  }
});

module.exports = router;



