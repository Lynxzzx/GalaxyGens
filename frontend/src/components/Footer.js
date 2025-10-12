import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Galaxy Gen's</h3>
          <p className="footer-text">
            A melhor plataforma de geração de contas premium
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Desenvolvido por</h4>
          <p className="footer-dev">
            <span className="dev-badge">👑</span> Lynx
          </p>
          <a 
            href="https://t.me/lynxdevz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            📱 Telegram: @lynxdevz
          </a>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Links Úteis</h4>
          <div className="footer-links">
            <a href="/plans" className="footer-link">Planos</a>
            <a href="/tickets" className="footer-link">Suporte</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024-2025 Galaxy Gen's. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



