import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PixPayment.css';

const PixPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  
  const { pixData } = location.state || {};

  if (!pixData) {
    navigate('/plans');
    return null;
  }

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixData.qr_code_text);
    setCopied(true);
    toast.success('Código PIX copiado!');
    setTimeout(() => setCopied(false), 3000);
  };

  const checkPayment = async () => {
    try {
      setChecking(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(
        `${API_URL}/payments/check/${pixData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.status === 'approved') {
        toast.success('🎉 Pagamento aprovado! Seu plano foi ativado!');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else if (response.data.status === 'pending') {
        toast.info('⏳ Pagamento ainda não foi identificado. Aguarde alguns segundos após pagar.');
      } else {
        toast.warning('Pagamento não aprovado. Status: ' + response.data.status);
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      toast.error('Erro ao verificar pagamento');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="pix-payment-container">
        <div className="pix-payment-card">
          <div className="pix-header">
            <h1 className="pix-title">💳 Pagamento via PIX</h1>
            <p className="pix-subtitle">Escaneie o QR Code ou copie o código</p>
          </div>

          <div className="pix-content">
            {/* QR Code */}
            <div className="qr-code-section">
              <div className="qr-code-wrapper">
                {pixData.qr_code_base64 ? (
                  <img 
                    src={`data:image/png;base64,${pixData.qr_code_base64}`}
                    alt="QR Code PIX"
                    className="qr-code-image"
                  />
                ) : (
                  <div className="qr-code-placeholder">
                    <p>QR Code não disponível</p>
                  </div>
                )}
              </div>
              <p className="qr-code-instruction">
                Abra o app do seu banco e escaneie o QR Code
              </p>
            </div>

            {/* Divisor */}
            <div className="pix-divider">
              <span>OU</span>
            </div>

            {/* Pix Copia e Cola */}
            <div className="pix-code-section">
              <label className="pix-code-label">
                Código PIX (Copia e Cola)
              </label>
              <div className="pix-code-wrapper">
                <input
                  type="text"
                  value={pixData.qr_code_text || ''}
                  readOnly
                  className="pix-code-input"
                />
                <button 
                  onClick={copyPixCode}
                  className={`btn-copy ${copied ? 'copied' : ''}`}
                >
                  {copied ? '✓ Copiado!' : '📋 Copiar'}
                </button>
              </div>
              <p className="pix-code-instruction">
                Copie o código e cole no app do seu banco
              </p>
            </div>

            {/* Informações */}
            <div className="pix-info">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div className="info-text">
                  <strong>Válido por:</strong>
                  <p>30 minutos</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">💰</span>
                <div className="info-text">
                  <strong>Aprovação:</strong>
                  <p>Instantânea após pagamento</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✅</span>
                <div className="info-text">
                  <strong>Seu plano:</strong>
                  <p>Será ativado automaticamente</p>
                </div>
              </div>
            </div>

            {/* Instruções */}
            <div className="pix-instructions">
              <h3>Como pagar:</h3>
              <ol>
                <li>Abra o aplicativo do seu banco</li>
                <li>Escolha a opção PIX</li>
                <li>Escaneie o QR Code ou cole o código</li>
                <li>Confirme o pagamento</li>
                <li>Aguarde a confirmação (instantânea)</li>
              </ol>
            </div>

            {/* Botão de Verificação */}
            <div className="pix-check-section">
              <button 
                className="btn-check"
                onClick={checkPayment}
                disabled={checking}
              >
                {checking ? (
                  <>
                    <span className="spinner"></span>
                    Verificando...
                  </>
                ) : (
                  <>
                    🔍 Já Paguei - Verificar Pagamento
                  </>
                )}
              </button>
              <p className="check-info">
                Clique aqui após efetuar o pagamento para ativar seu plano
              </p>
            </div>

            {/* Botões */}
            <div className="pix-actions">
              <button 
                className="btn-secondary"
                onClick={() => navigate('/plans')}
              >
                ← Voltar aos Planos
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Ir para Dashboard →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PixPayment;

