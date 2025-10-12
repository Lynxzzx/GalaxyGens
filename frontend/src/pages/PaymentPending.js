import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PaymentStatus.css';

const PaymentPending = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info('Pagamento pendente de confirmação');
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="payment-status-container">
        <div className="payment-status-card pending">
          <div className="status-icon">⏳</div>
          <h1 className="status-title">Pagamento Pendente</h1>
          <p className="status-message">
            Seu pagamento está sendo processado.
          </p>
          <p className="status-details">
            Isso pode levar alguns minutos. Você receberá uma notificação
            assim que o pagamento for confirmado.
            <br /><br />
            Verifique seu dashboard em alguns minutos.
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
              onClick={() => navigate('/plans')}
            >
              Ver Planos
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPending;


