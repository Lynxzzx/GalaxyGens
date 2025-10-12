import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configurar axios
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    console.log('🌐 API_URL configurada:', API_URL);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('🔐 Tentando login...', { API_URL, username });
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      
      console.log('✅ Login bem-sucedido:', response.data);
      const { token: newToken, ...userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      toast.success(`Bem-vindo, ${userData.username}!`);
      return true;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      console.error('Resposta do servidor:', error.response);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error('Backend não está respondendo! Certifique-se que está rodando na porta 5000');
      } else if (error.response?.status === 401) {
        toast.error('Usuário ou senha incorretos');
      } else {
        toast.error(error.response?.data?.message || 'Erro ao fazer login. Verifique o console (F12)');
      }
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      console.log('📝 Tentando registrar...', { API_URL, username });
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password
      });
      
      console.log('✅ Registro bem-sucedido:', response.data);
      const { token: newToken, ...userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      toast.success('Conta criada com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      console.error('Resposta do servidor:', error.response);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error('Backend não está respondendo! Certifique-se que está rodando na porta 5000');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Usuário já existe');
      } else {
        toast.error(error.response?.data?.message || 'Erro ao registrar. Verifique o console (F12)');
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.info('Você saiu da conta');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isOwner: user?.role === 'owner',
    isAdmin: user?.role === 'admin' || user?.role === 'owner',
    API_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

