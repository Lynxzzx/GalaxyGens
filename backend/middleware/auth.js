const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticação
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Não autorizado, token inválido' });
  }
};

// Middleware para verificar se é owner
exports.isOwner = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Apenas owner.' });
  }
};

// Middleware para verificar se é admin ou owner
exports.isAdminOrOwner = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'owner')) {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Apenas admin ou owner.' });
  }
};

// Middleware para verificar plano ativo
exports.hasActivePlan = (req, res, next) => {
  if (req.user.role === 'owner' || req.user.role === 'admin') {
    return next();
  }
  
  if (!req.user.hasActivePlan()) {
    return res.status(403).json({ message: 'Plano expirado ou inativo' });
  }
  
  next();
};



