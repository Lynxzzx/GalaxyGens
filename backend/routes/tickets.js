const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect, isAdminOrOwner } = require('../middleware/auth');

// @route   GET /api/tickets
// @desc    Listar tickets (usuário vê seus próprios, admin/owner vê todos)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let tickets;
    
    if (req.user.role === 'owner' || req.user.role === 'admin') {
      tickets = await Ticket.find()
        .populate('createdBy', 'username role')
        .populate('assignedTo', 'username')
        .populate('messages.user', 'username role')
        .sort('-createdAt');
    } else {
      tickets = await Ticket.find({ createdBy: req.user._id })
        .populate('createdBy', 'username')
        .populate('messages.user', 'username role')
        .sort('-createdAt');
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tickets', error: error.message });
  }
});

// @route   GET /api/tickets/:id
// @desc    Obter detalhes de um ticket
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'username role')
      .populate('assignedTo', 'username')
      .populate('messages.user', 'username role');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    // Verificar permissão
    if (
      req.user.role !== 'owner' &&
      req.user.role !== 'admin' &&
      ticket.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ticket', error: error.message });
  }
});

// @route   POST /api/tickets
// @desc    Criar novo ticket
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || 'medium',
      createdBy: req.user._id,
      messages: [{
        user: req.user._id,
        message: description,
        isStaff: false
      }]
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('createdBy', 'username')
      .populate('messages.user', 'username role');

    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ticket', error: error.message });
  }
});

// @route   POST /api/tickets/:id/messages
// @desc    Adicionar mensagem ao ticket
// @access  Private
router.post('/:id/messages', protect, async (req, res) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    // Verificar permissão
    if (
      req.user.role !== 'owner' &&
      req.user.role !== 'admin' &&
      ticket.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const isStaff = req.user.role === 'owner' || req.user.role === 'admin';

    ticket.messages.push({
      user: req.user._id,
      message,
      isStaff
    });

    if (isStaff && ticket.status === 'open') {
      ticket.status = 'in_progress';
    }

    await ticket.save();

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('createdBy', 'username role')
      .populate('assignedTo', 'username')
      .populate('messages.user', 'username role');

    res.json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar mensagem', error: error.message });
  }
});

// @route   PUT /api/tickets/:id/status
// @desc    Atualizar status do ticket
// @access  Private (Admin/Owner)
router.put('/:id/status', protect, isAdminOrOwner, async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    ticket.status = status;
    await ticket.save();

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('createdBy', 'username role')
      .populate('assignedTo', 'username')
      .populate('messages.user', 'username role');

    res.json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status', error: error.message });
  }
});

// @route   PUT /api/tickets/:id/assign
// @desc    Atribuir ticket a um admin
// @access  Private (Admin/Owner)
router.put('/:id/assign', protect, isAdminOrOwner, async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    ticket.assignedTo = assignedTo;
    await ticket.save();

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('createdBy', 'username role')
      .populate('assignedTo', 'username')
      .populate('messages.user', 'username role');

    res.json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atribuir ticket', error: error.message });
  }
});

// @route   DELETE /api/tickets/:id
// @desc    Deletar ticket
// @access  Private (Admin/Owner)
router.delete('/:id', protect, isAdminOrOwner, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }
    res.json({ message: 'Ticket deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar ticket', error: error.message });
  }
});

module.exports = router;



