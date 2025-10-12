import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await axios.get(`${API_URL}/plans`);
      setPlans(response.data);
    } catch (error) {
      toast.error('Erro ao carregar planos');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Você precisa estar logado para comprar um plano');
        return;
      }

      toast.info('Gerando PIX...');
      
      const response = await axios.post(
        `${API_URL}/payments/create-preference`, 
        { planId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.qr_code_text) {
        // Redirecionar para página do PIX
        navigate('/payment/pix', {
          state: {
            pixData: response.data
          }
        });
      } else {
        toast.error('Erro ao gerar código PIX');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      if (error.response?.status === 401) {
        toast.error('Sessão expirada. Faça login novamente');
      } else if (error.response?.status === 404) {
        toast.error('Plano não encontrado');
      } else {
        toast.error(error.response?.data?.message || 'Erro ao processar pagamento');
      }
    }
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
      
      <div className="plans-container">
        <div className="plans-header">
          <h1 className="plans-title">💎 Planos Premium</h1>
          <p className="plans-subtitle">Escolha o melhor plano para você</p>
        </div>

        {plans.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <p className="empty-text">Nenhum plano disponível no momento</p>
          </div>
        ) : (
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={plan._id} className={`plan-card ${index === 1 ? 'featured' : ''}`}>
                {index === 1 && <div className="plan-badge">✨ Mais Popular</div>}
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-price">
                  <span className="price-currency">R$</span>
                  <span className="price-value">{plan.price.toFixed(2)}</span>
                  <span className="price-period">/ {plan.duration} dias</span>
                </div>

                <ul className="plan-features">
                  {plan.features && plan.features.length > 0 ? (
                    plan.features.map((feature, idx) => (
                      <li key={idx} className="plan-feature">
                        <span className="feature-icon">✅</span>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="plan-feature">
                        <span className="feature-icon">✅</span>
                        Acesso a todos os geradores
                      </li>
                      <li className="plan-feature">
                        <span className="feature-icon">✅</span>
                        Contas ilimitadas
                      </li>
                      <li className="plan-feature">
                        <span className="feature-icon">✅</span>
                        Suporte prioritário
                      </li>
                      <li className="plan-feature">
                        <span className="feature-icon">✅</span>
                        Atualizações constantes
                      </li>
                    </>
                  )}
                </ul>

                <button 
                  className="btn-primary plan-button"
                  onClick={() => handlePurchase(plan._id)}
                >
                  🛒 Comprar Agora
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="plans-info">
          <div className="info-card">
            <h3 className="info-title">💳 Pagamento Seguro</h3>
            <p className="info-text">
              Processado através do Mercado Pago com a máxima segurança
            </p>
          </div>
          <div className="info-card">
            <h3 className="info-title">🔄 Renovação Automática</h3>
            <p className="info-text">
              Seus planos podem ser renovados a qualquer momento
            </p>
          </div>
          <div className="info-card">
            <h3 className="info-title">💬 Suporte 24/7</h3>
            <p className="info-text">
              Nossa equipe está sempre disponível para ajudar
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Plans;


