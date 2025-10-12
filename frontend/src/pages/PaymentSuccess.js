import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PaymentStatus.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Pagamento aprovado! Seu plano foi ativado!');
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="payment-status-container">
        <div className="payment-status-card success">
          <div className="status-icon">✅</div>
          <h1 className="status-title">Pagamento Aprovado!</h1>
          <p className="status-message">
            Seu plano foi ativado com sucesso! 🎉
          </p>
          <p className="status-details">
            Agora você tem acesso completo a todos os geradores de contas.
          </p>

          <div className="status-actions">
            <button 
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Ir para Dashboard
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/generator')}
            >
              Começar a Gerar Contas
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;


