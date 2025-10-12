const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

// Carregar variáveis de ambiente
dotenv.config();

// Função para criar o Owner automaticamente
const ensureOwnerExists = async () => {
  try {
    // Verificar se o owner já existe
    const ownerExists = await User.findOne({ username: 'Lynx' });
    
    if (!ownerExists) {
      console.log('👑 Criando usuário Owner automaticamente...');
      await User.create({
        username: 'Lynx',
        password: 'eliezermito1',
        role: 'owner',
        isActive: true
      });
      console.log('✅ Usuário Owner criado com sucesso!');
      console.log('   Usuário: Lynx');
      console.log('   Senha: eliezermito1');
      console.log('');
    } else {
      console.log('👑 Usuário Owner já existe no database');
      console.log('');
    }
  } catch (error) {
    console.error('❌ Erro ao verificar/criar Owner:', error.message);
  }
};

// Conectar ao banco de dados e criar owner
connectDB().then(() => {
  ensureOwnerExists();
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/giftcodes', require('./routes/giftcodes'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/payments', require('./routes/payments'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Galaxy Gen\'s API - Desenvolvido por Lynx' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ ERRO NO SERVIDOR:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('   🌌 Galaxy Gen\'s - Backend');
  console.log('   Desenvolvido por Lynx');
  console.log('========================================');
  console.log('');
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`📱 Telegram: t.me/lynxdevz`);
  console.log('');
  console.log('✅ Backend pronto para receber requisições!');
  console.log('');
});

