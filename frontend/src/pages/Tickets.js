import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Tickets.css';

const Tickets = () => {
  const { user, API_URL, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Formulário de novo ticket
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      toast.error('Erro ao carregar tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await axios.post(`${API_URL}/tickets`, newTicket);
      toast.success('Ticket criado com sucesso!');
      setShowCreateModal(false);
      setNewTicket({ title: '', description: '', priority: 'medium' });
      loadTickets();
    } catch (error) {
      toast.error('Erro ao criar ticket');
    } finally {
      setSending(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);

    try {
      await axios.post(`${API_URL}/tickets/${selectedTicket._id}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      const response = await axios.get(`${API_URL}/tickets/${selectedTicket._id}`);
      setSelectedTicket(response.data);
      loadTickets();
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      await axios.put(`${API_URL}/tickets/${ticketId}/status`, { status });
      toast.success('Status atualizado!');
      loadTickets();
      if (selectedTicket?._id === ticketId) {
        const response = await axios.get(`${API_URL}/tickets/${ticketId}`);
        setSelectedTicket(response.data);
      }
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      open: { class: 'badge-primary', text: 'Aberto', emoji: '🆕' },
      in_progress: { class: 'badge-warning', text: 'Em Progresso', emoji: '⏳' },
      resolved: { class: 'badge-success', text: 'Resolvido', emoji: '✅' },
      closed: { class: 'badge-danger', text: 'Fechado', emoji: '🔒' }
    };
    return badges[status] || badges.open;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { class: 'badge-success', text: 'Baixa' },
      medium: { class: 'badge-warning', text: 'Média' },
      high: { class: 'badge-danger', text: 'Alta' }
    };
    return badges[priority] || badges.medium;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="loading" style={{ width: '50px', height: '50px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="tickets-container">
        <div className="tickets-header">
          <div>
            <h1 className="tickets-title">🎫 Sistema de Tickets</h1>
            <p className="tickets-subtitle">Gerencie seus tickets de suporte</p>
          </div>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            ➕ Novo Ticket
          </button>
        </div>

        <div className="tickets-layout">
          <div className="tickets-list">
            {tickets.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📭</p>
                <p className="empty-text">Nenhum ticket encontrado</p>
              </div>
            ) : (
              tickets.map(ticket => {
                const statusBadge = getStatusBadge(ticket.status);
                const priorityBadge = getPriorityBadge(ticket.priority);
                
                return (
                  <div
                    key={ticket._id}
                    className={`ticket-item ${selectedTicket?._id === ticket._id ? 'active' : ''}`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="ticket-item-header">
                      <h3 className="ticket-item-title">{ticket.title}</h3>
                      <span className={`badge ${statusBadge.class}`}>
                        {statusBadge.emoji} {statusBadge.text}
                      </span>
                    </div>
                    <div className="ticket-item-meta">
                      <span className={`badge ${priorityBadge.class}`}>{priorityBadge.text}</span>
                      <span className="ticket-item-date">{formatDate(ticket.createdAt)}</span>
                    </div>
                    {isAdmin && (
                      <p className="ticket-item-user">Por: {ticket.createdBy?.username}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {selectedTicket && (
            <div className="ticket-detail">
              <div className="ticket-detail-header">
                <div>
                  <h2 className="ticket-detail-title">{selectedTicket.title}</h2>
                  <div className="ticket-detail-meta">
                    <span className={`badge ${getStatusBadge(selectedTicket.status).class}`}>
                      {getStatusBadge(selectedTicket.status).emoji} {getStatusBadge(selectedTicket.status).text}
                    </span>
                    <span className={`badge ${getPriorityBadge(selectedTicket.priority).class}`}>
                      {getPriorityBadge(selectedTicket.priority).text}
                    </span>
                    <span className="ticket-detail-date">{formatDate(selectedTicket.createdAt)}</span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="ticket-actions">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => updateTicketStatus(selectedTicket._id, e.target.value)}
                      className="input-field"
                    >
                      <option value="open">Aberto</option>
                      <option value="in_progress">Em Progresso</option>
                      <option value="resolved">Resolvido</option>
                      <option value="closed">Fechado</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="ticket-messages">
                {selectedTicket.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`ticket-message ${msg.isStaff ? 'staff-message' : 'user-message'}`}
                  >
                    <div className="message-header">
                      <span className="message-author">
                        {msg.user?.username}
                        {msg.isStaff && ' 👑'}
                      </span>
                      <span className="message-date">{formatDate(msg.createdAt)}</span>
                    </div>
                    <p className="message-content">{msg.message}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="ticket-reply-form">
                <textarea
                  className="input-field"
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  disabled={sending}
                  required
                />
                <button type="submit" className="btn-primary" disabled={sending}>
                  {sending ? <div className="loading"></div> : '📤 Enviar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Criar Novo Ticket</h2>
            <form onSubmit={createTicket} className="modal-form">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  className="input-field"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  required
                  disabled={sending}
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  className="input-field"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  rows={5}
                  required
                  disabled={sending}
                />
              </div>
              <div className="form-group">
                <label>Prioridade</label>
                <select
                  className="input-field"
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                  disabled={sending}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={sending}>
                  {sending ? <div className="loading"></div> : 'Criar Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Tickets;



