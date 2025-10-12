import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const { user, API_URL } = useAuth();
  const [stats, setStats] = useState({
    totalServices: 0,
    generatedAccounts: 0
  });
  const [history, setHistory] = useState([]);
  const [giftCode, setGiftCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/me/history`);
      setHistory(response.data);
      setStats({
        generatedAccounts: response.data.length,
        totalServices: new Set(response.data.map(item => item.service?._id)).size
      });
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const handleRedeemCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/giftcodes/redeem`, {
        code: giftCode
      });
      alert(response.data.message);
      setGiftCode('');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao resgatar código');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlanStatus = () => {
    if (user.role === 'owner' || user.role === 'admin') {
      return { text: 'Ilimitado', class: 'badge-success', emoji: '👑' };
    }
    
    if (!user.planExpiry) {
      return { text: 'Sem Plano', class: 'badge-danger', emoji: '❌' };
    }

    const expiry = new Date(user.planExpiry);
    const now = new Date();
    
    if (expiry < now) {
      return { text: 'Expirado', class: 'badge-danger', emoji: '⏰' };
    }

    const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) {
      return { text: `${daysLeft} dias`, class: 'badge-warning', emoji: '⚠️' };
    }

    return { text: `${daysLeft} dias`, class: 'badge-success', emoji: '✅' };
  };

  const planStatus = getPlanStatus();

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Bem-vindo, {user?.username}! 👋</h1>
            <p className="dashboard-subtitle">Gerencie suas contas e veja suas estatísticas</p>
          </div>
          <div className="plan-status-card">
            <span className="plan-emoji">{planStatus.emoji}</span>
            <div>
              <p className="plan-label">Status do Plano</p>
              <p className={`badge ${planStatus.class}`}>{planStatus.text}</p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <p className="stat-value">{stats.totalServices}</p>
              <p className="stat-label">Serviços Usados</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <p className="stat-value">{stats.generatedAccounts}</p>
              <p className="stat-label">Contas Geradas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <p className="stat-value">{user?.role}</p>
              <p className="stat-label">Seu Cargo</p>
            </div>
          </div>
        </div>

        {user?.role === 'user' && (
          <div className="gift-code-section">
            <div className="card">
              <h2 className="section-title">🎁 Resgatar Gift Code</h2>
              <form onSubmit={handleRedeemCode} className="gift-form">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Digite o código do gift"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  required
                  disabled={loading}
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <div className="loading"></div> : 'Resgatar'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="history-section">
          <h2 className="section-title">📋 Histórico de Contas Geradas</h2>
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📭</p>
                <p className="empty-text">Você ainda não gerou nenhuma conta</p>
                <p className="empty-subtext">Vá para o Gerador e comece agora!</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-service">
                    <span className="service-icon">{item.service?.icon || '🎮'}</span>
                    <div>
                      <p className="service-name">{item.service?.name || 'Serviço Removido'}</p>
                      <p className="service-date">{formatDate(item.generatedAt)}</p>
                    </div>
                  </div>
                  <div className="history-account">
                    <code className="account-credentials">{item.account}</code>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;



