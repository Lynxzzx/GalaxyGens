const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conectado ao MongoDB');

    // Verificar se owner já existe
    const ownerExists = await User.findOne({ username: 'Lynx' });
    
    if (ownerExists) {
      console.log('Owner Lynx já existe!');
      process.exit(0);
    }

    // Criar owner
    const owner = await User.create({
      username: 'Lynx',
      password: 'eliezermito1',
      role: 'owner',
      isActive: true
    });

    console.log('✅ Owner criado com sucesso!');
    console.log('Usuário: Lynx');
    console.log('Senha: eliezermito1');
    console.log('Role: owner');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar owner:', error.message);
    process.exit(1);
  }
};

createOwner();


