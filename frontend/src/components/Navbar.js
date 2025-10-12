import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src="/logo.svg" alt="Galaxy Gen's" className="navbar-logo" />
          <span className="navbar-title">Galaxy Gen's</span>
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            🏠 Dashboard
          </Link>
          <Link 
            to="/generator" 
            className={`navbar-link ${isActive('/generator') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            ⚡ Gerador
          </Link>
          <Link 
            to="/tickets" 
            className={`navbar-link ${isActive('/tickets') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            🎫 Tickets
          </Link>
          <Link 
            to="/plans" 
            className={`navbar-link ${isActive('/plans') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            💎 Planos
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              👑 Admin
            </Link>
          )}
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">{user?.username}</span>
            <span className="user-role badge badge-primary">{user?.role}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

