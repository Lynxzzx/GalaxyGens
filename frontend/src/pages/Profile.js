import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPlanStatus = () => {
    if (user.role === 'owner' || user.role === 'admin') {
      return { text: 'Ilimitado', class: 'badge-success' };
    }
    
    if (!user.planExpiry) {
      return { text: 'Sem Plano', class: 'badge-danger' };
    }

    const expiry = new Date(user.planExpiry);
    const now = new Date();
    
    if (expiry < now) {
      return { text: 'Expirado', class: 'badge-danger' };
    }

    return { text: 'Ativo', class: 'badge-success' };
  };

  const planStatus = getPlanStatus();

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">👤 Meu Perfil</h1>
          <p className="profile-subtitle">Informações da sua conta</p>
        </div>

        <div className="profile-content">
          <div className="profile-card main-card">
            <div className="profile-avatar">
              <span className="avatar-text">{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="profile-username">{user?.username}</h2>
            <div className="profile-role">
              <span className="role-badge badge badge-primary">{user?.role}</span>
            </div>
          </div>

          <div className="profile-card">
            <h3 className="card-title">📊 Informações da Conta</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Nome de Usuário:</span>
                <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Cargo:</span>
                <span className="info-value">{user?.role}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status da Conta:</span>
                <span className={`badge ${user?.isActive ? 'badge-success' : 'badge-danger'}`}>
                  {user?.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Membro desde:</span>
                <span className="info-value">{formatDate(user?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3 className="card-title">💎 Plano Atual</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Status do Plano:</span>
                <span className={`badge ${planStatus.class}`}>{planStatus.text}</span>
              </div>
              {user?.planExpiry && user.role === 'user' && (
                <div className="info-item">
                  <span className="info-label">Expira em:</span>
                  <span className="info-value">{formatDate(user.planExpiry)}</span>
                </div>
              )}
              {user?.generatedAccounts && (
                <div className="info-item">
                  <span className="info-label">Contas Geradas:</span>
                  <span className="info-value">{user.generatedAccounts.length}</span>
                </div>
              )}
            </div>
          </div>

          {(user?.role === 'owner' || user?.role === 'admin') && (
            <div className="profile-card admin-card">
              <h3 className="card-title">👑 Privilégios de {user.role === 'owner' ? 'Owner' : 'Admin'}</h3>
              <ul className="privileges-list">
                {user.role === 'owner' && (
                  <>
                    <li>✅ Acesso total ao sistema</li>
                    <li>✅ Gerenciar serviços e estoque</li>
                    <li>✅ Criar códigos gift</li>
                    <li>✅ Gerenciar todos os usuários</li>
                    <li>✅ Atribuir cargo de Admin</li>
                    <li>✅ Gerenciar tickets</li>
                    <li>✅ Acesso ilimitado ao gerador</li>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <li>✅ Gerenciar tickets</li>
                    <li>✅ Visualizar usuários</li>
                    <li>✅ Acesso ilimitado ao gerador</li>
                    <li>✅ Suporte aos usuários</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;



