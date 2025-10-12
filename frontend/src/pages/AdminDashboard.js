import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, API_URL, isOwner } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  // State para usuários
  const [users, setUsers] = useState([]);
  
  // State para serviços
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', icon: '🎮' });
  const [accountsToAdd, setAccountsToAdd] = useState('');
  
  // State para gift codes
  const [giftCodes, setGiftCodes] = useState([]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftForm, setGiftForm] = useState({ code: '', duration: '' });
  
  // State para planos
  const [plans, setPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    features: ''
  });

  useEffect(() => {
    if (!isOwner) return;
    loadData();
  }, [activeTab, isOwner]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'users':
          const usersRes = await axios.get(`${API_URL}/users`);
          setUsers(usersRes.data);
          break;
        case 'services':
          const servicesRes = await axios.get(`${API_URL}/services`);
          setServices(servicesRes.data);
          break;
        case 'giftcodes':
          const giftsRes = await axios.get(`${API_URL}/giftcodes`);
          setGiftCodes(giftsRes.data);
          break;
        case 'plans':
          const plansRes = await axios.get(`${API_URL}/plans`);
          setPlans(plansRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  // Funções de usuários
  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'user' ? 'admin' : 'user';
    try {
      await axios.put(`${API_URL}/users/${userId}/role`, { role: newRole });
      toast.success('Cargo atualizado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao atualizar cargo');
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await axios.put(`${API_URL}/users/${userId}/toggle`);
      toast.success('Status atualizado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const addDaysToUser = async (userId) => {
    const days = prompt('Quantos dias adicionar?');
    if (!days || isNaN(days)) return;

    try {
      await axios.put(`${API_URL}/users/${userId}/plan`, { days: parseInt(days) });
      toast.success(`${days} dias adicionados!`);
      loadData();
    } catch (error) {
      toast.error('Erro ao adicionar dias');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      toast.success('Usuário deletado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao deletar usuário');
    }
  };

  // Funções de serviços
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`${API_URL}/services/${editingService._id}`, serviceForm);
        toast.success('Serviço atualizado!');
      } else {
        await axios.post(`${API_URL}/services`, serviceForm);
        toast.success('Serviço criado!');
      }
      setShowServiceModal(false);
      setEditingService(null);
      setServiceForm({ name: '', description: '', icon: '🎮' });
      loadData();
    } catch (error) {
      toast.error('Erro ao salvar serviço');
    }
  };

  const addAccountsToService = async (serviceId) => {
    if (!accountsToAdd.trim()) {
      toast.error('Digite as contas!');
      return;
    }

    const accounts = accountsToAdd.split('\n').filter(acc => acc.trim());
    
    try {
      await axios.post(`${API_URL}/services/${serviceId}/accounts`, { accounts });
      toast.success(`${accounts.length} contas adicionadas!`);
      setAccountsToAdd('');
      loadData();
    } catch (error) {
      toast.error('Erro ao adicionar contas');
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Tem certeza que deseja deletar este serviço?')) return;

    try {
      await axios.delete(`${API_URL}/services/${serviceId}`);
      toast.success('Serviço deletado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao deletar serviço');
    }
  };

  // Funções de gift codes
  const handleGiftSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/giftcodes`, giftForm);
      toast.success('Gift code criado!');
      setShowGiftModal(false);
      setGiftForm({ code: '', duration: '' });
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao criar gift code');
    }
  };

  const deleteGiftCode = async (giftId) => {
    if (!window.confirm('Tem certeza que deseja deletar este gift code?')) return;

    try {
      await axios.delete(`${API_URL}/giftcodes/${giftId}`);
      toast.success('Gift code deletado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao deletar gift code');
    }
  };

  // Funções de planos
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...planForm,
        duration: parseInt(planForm.duration),
        price: parseFloat(planForm.price),
        features: planForm.features.split('\n').filter(f => f.trim())
      };

      if (editingPlan) {
        await axios.put(`${API_URL}/plans/${editingPlan._id}`, planData);
        toast.success('Plano atualizado!');
      } else {
        await axios.post(`${API_URL}/plans`, planData);
        toast.success('Plano criado!');
      }
      
      setShowPlanModal(false);
      setEditingPlan(null);
      setPlanForm({ name: '', description: '', duration: '', price: '', features: '' });
      loadData();
    } catch (error) {
      toast.error('Erro ao salvar plano');
    }
  };

  const deletePlan = async (planId) => {
    if (!window.confirm('Tem certeza que deseja deletar este plano?')) return;

    try {
      await axios.delete(`${API_URL}/plans/${planId}`);
      toast.success('Plano deletado!');
      loadData();
    } catch (error) {
      toast.error('Erro ao deletar plano');
    }
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

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">👑 Painel Administrativo</h1>
          <p className="admin-subtitle">Gerenciar todo o sistema</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuários
          </button>
          <button
            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            🎮 Serviços
          </button>
          <button
            className={`admin-tab ${activeTab === 'giftcodes' ? 'active' : ''}`}
            onClick={() => setActiveTab('giftcodes')}
          >
            🎁 Gift Codes
          </button>
          <button
            className={`admin-tab ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            💎 Planos
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div className="loading" style={{ width: '50px', height: '50px' }}></div>
          </div>
        ) : (
          <div className="admin-content">
            {/* Tab de Usuários */}
            {activeTab === 'users' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Gerenciar Usuários ({users.length})</h2>
                </div>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Usuário</th>
                        <th>Cargo</th>
                        <th>Status</th>
                        <th>Plano Expira</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id}>
                          <td>{u.username}</td>
                          <td>
                            <span className={`badge badge-${u.role === 'owner' ? 'danger' : u.role === 'admin' ? 'warning' : 'primary'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}>
                              {u.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td>{u.planExpiry ? formatDate(u.planExpiry) : 'N/A'}</td>
                          <td>{formatDate(u.createdAt)}</td>
                          <td>
                            {u.role !== 'owner' && (
                              <div className="action-buttons">
                                <button
                                  className="btn-sm btn-secondary"
                                  onClick={() => toggleUserRole(u._id, u.role)}
                                >
                                  {u.role === 'admin' ? 'Remover Admin' : 'Tornar Admin'}
                                </button>
                                <button
                                  className="btn-sm btn-primary"
                                  onClick={() => addDaysToUser(u._id)}
                                >
                                  + Dias
                                </button>
                                <button
                                  className="btn-sm btn-secondary"
                                  onClick={() => toggleUserStatus(u._id)}
                                >
                                  {u.isActive ? 'Desativar' : 'Ativar'}
                                </button>
                                <button
                                  className="btn-sm btn-danger"
                                  onClick={() => deleteUser(u._id)}
                                >
                                  🗑️
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab de Serviços */}
            {activeTab === 'services' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Gerenciar Serviços ({services.length})</h2>
                  <button className="btn-primary" onClick={() => setShowServiceModal(true)}>
                    ➕ Novo Serviço
                  </button>
                </div>
                <div className="services-admin-grid">
                  {services.map(service => (
                    <div key={service._id} className="service-admin-card">
                      <div className="service-admin-header">
                        <span className="service-admin-icon">{service.icon}</span>
                        <h3>{service.name}</h3>
                      </div>
                      <p className="service-admin-desc">{service.description}</p>
                      <div className="service-admin-stock">
                        <span>Estoque: {service.availableStock} / {service.totalStock}</span>
                      </div>
                      <div className="service-admin-actions">
                        <button
                          className="btn-sm btn-primary"
                          onClick={() => {
                            setEditingService(service);
                            setServiceForm({
                              name: service.name,
                              description: service.description,
                              icon: service.icon
                            });
                            setShowServiceModal(true);
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn-sm btn-danger"
                          onClick={() => deleteService(service._id)}
                        >
                          🗑️ Deletar
                        </button>
                      </div>
                      <div className="add-accounts-section">
                        <textarea
                          className="input-field"
                          placeholder="email:senha (uma por linha)"
                          rows={3}
                          value={accountsToAdd}
                          onChange={(e) => setAccountsToAdd(e.target.value)}
                        />
                        <button
                          className="btn-sm btn-success"
                          onClick={() => addAccountsToService(service._id)}
                        >
                          ➕ Adicionar Contas
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab de Gift Codes */}
            {activeTab === 'giftcodes' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Gerenciar Gift Codes ({giftCodes.length})</h2>
                  <button className="btn-primary" onClick={() => setShowGiftModal(true)}>
                    ➕ Novo Gift Code
                  </button>
                </div>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Duração</th>
                        <th>Status</th>
                        <th>Usado Por</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {giftCodes.map(gift => (
                        <tr key={gift._id}>
                          <td><code>{gift.code}</code></td>
                          <td>{gift.duration} dias</td>
                          <td>
                            <span className={`badge ${gift.isUsed ? 'badge-danger' : 'badge-success'}`}>
                              {gift.isUsed ? 'Usado' : 'Disponível'}
                            </span>
                          </td>
                          <td>{gift.usedBy?.username || 'N/A'}</td>
                          <td>{formatDate(gift.createdAt)}</td>
                          <td>
                            <button
                              className="btn-sm btn-danger"
                              onClick={() => deleteGiftCode(gift._id)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab de Planos */}
            {activeTab === 'plans' && (
              <div className="admin-section">
                <div className="section-header">
                  <h2>Gerenciar Planos ({plans.length})</h2>
                  <button className="btn-primary" onClick={() => setShowPlanModal(true)}>
                    ➕ Novo Plano
                  </button>
                </div>
                <div className="plans-admin-grid">
                  {plans.map(plan => (
                    <div key={plan._id} className="plan-admin-card">
                      <h3>{plan.name}</h3>
                      <p>{plan.description}</p>
                      <div className="plan-admin-info">
                        <span>R$ {plan.price.toFixed(2)}</span>
                        <span>{plan.duration} dias</span>
                      </div>
                      <div className="plan-admin-actions">
                        <button
                          className="btn-sm btn-primary"
                          onClick={() => {
                            setEditingPlan(plan);
                            setPlanForm({
                              name: plan.name,
                              description: plan.description,
                              duration: plan.duration,
                              price: plan.price,
                              features: plan.features.join('\n')
                            });
                            setShowPlanModal(true);
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn-sm btn-danger"
                          onClick={() => deletePlan(plan._id)}
                        >
                          🗑️ Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Serviço */}
      {showServiceModal && (
        <div className="modal-overlay" onClick={() => setShowServiceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editingService ? 'Editar' : 'Criar'} Serviço</h2>
            <form onSubmit={handleServiceSubmit} className="modal-form">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ícone (emoji)</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                  maxLength={2}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowServiceModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingService ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Gift Code */}
      {showGiftModal && (
        <div className="modal-overlay" onClick={() => setShowGiftModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Criar Gift Code</h2>
            <form onSubmit={handleGiftSubmit} className="modal-form">
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  className="input-field"
                  value={giftForm.code}
                  onChange={(e) => setGiftForm({...giftForm, code: e.target.value.toUpperCase()})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duração (dias)</label>
                <input
                  type="number"
                  className="input-field"
                  value={giftForm.duration}
                  onChange={(e) => setGiftForm({...giftForm, duration: e.target.value})}
                  required
                  min="1"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowGiftModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Plano */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editingPlan ? 'Editar' : 'Criar'} Plano</h2>
            <form onSubmit={handlePlanSubmit} className="modal-form">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="input-field"
                  value={planForm.name}
                  onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  className="input-field"
                  value={planForm.description}
                  onChange={(e) => setPlanForm({...planForm, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Duração (dias)</label>
                <input
                  type="number"
                  className="input-field"
                  value={planForm.duration}
                  onChange={(e) => setPlanForm({...planForm, duration: e.target.value})}
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  value={planForm.price}
                  onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Recursos (um por linha)</label>
                <textarea
                  className="input-field"
                  value={planForm.features}
                  onChange={(e) => setPlanForm({...planForm, features: e.target.value})}
                  rows={5}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPlanModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingPlan ? 'Atualizar' : 'Criar'}
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

export default AdminDashboard;



