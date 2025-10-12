import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PaymentStatus.css';

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Pagamento não foi concluído');
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="payment-status-container">
        <div className="payment-status-card failure">
          <div className="status-icon">❌</div>
          <h1 className="status-title">Pagamento Não Concluído</h1>
          <p className="status-message">
            Não foi possível processar seu pagamento.
          </p>
          <p className="status-details">
            Isso pode acontecer por diversos motivos:
            <br />• Saldo insuficiente
            <br />• Dados incorretos
            <br />• Cancelamento da compra
          </p>

          <div className="status-actions">
            <button 
              className="btn-primary"
              onClick={() => navigate('/plans')}
            >
              Tentar Novamente
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentFailure;


