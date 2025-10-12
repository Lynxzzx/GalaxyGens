import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Generator.css';

const Generator = () => {
  const { user, API_URL } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(null);
  const [generatedAccount, setGeneratedAccount] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      toast.error('Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (serviceId, serviceName) => {
    if (user.role === 'user' && !user.hasActivePlan) {
      toast.error('Você precisa de um plano ativo para gerar contas!');
      return;
    }

    setGenerating(serviceId);
    setGeneratedAccount(null);

    try {
      const response = await axios.post(`${API_URL}/services/${serviceId}/generate`);
      setGeneratedAccount({
        service: serviceName,
        account: response.data.account
      });
      toast.success('Conta gerada com sucesso!');
      loadServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao gerar conta');
    } finally {
      setGenerating(null);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
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
      
      <div className="generator-container">
        <div className="generator-header">
          <h1 className="generator-title">⚡ Gerador de Contas</h1>
          <p className="generator-subtitle">Escolha um serviço e gere sua conta</p>
        </div>

        {generatedAccount && (
          <div className="generated-account-card">
            <div className="generated-header">
              <h3 className="generated-title">✅ Conta Gerada com Sucesso!</h3>
              <p className="generated-service">{generatedAccount.service}</p>
            </div>
            <div className="generated-content">
              <code className="generated-credentials">{generatedAccount.account}</code>
              <button 
                className="btn-primary copy-btn"
                onClick={() => copyToClipboard(generatedAccount.account)}
              >
                📋 Copiar
              </button>
            </div>
          </div>
        )}

        {services.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <p className="empty-text">Nenhum serviço disponível no momento</p>
            <p className="empty-subtext">Entre em contato com o suporte</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map(service => (
              <div key={service._id} className="service-card">
                <div className="service-icon-large">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-stock">
                  <span className="stock-label">Estoque:</span>
                  <span className={`stock-value ${service.availableStock > 0 ? 'in-stock' : 'out-stock'}`}>
                    {service.availableStock} contas
                  </span>
                </div>

                <button 
                  className={`btn-primary generate-btn ${service.availableStock === 0 ? 'disabled' : ''}`}
                  onClick={() => handleGenerate(service._id, service.name)}
                  disabled={generating === service._id || service.availableStock === 0}
                >
                  {generating === service._id ? (
                    <div className="loading"></div>
                  ) : service.availableStock === 0 ? (
                    'Sem Estoque'
                  ) : (
                    '⚡ Gerar Conta'
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Generator;



