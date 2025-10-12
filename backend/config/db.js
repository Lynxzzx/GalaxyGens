const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Conectando ao MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log('');
    
    return conn;
  } catch (error) {
    console.error(`❌ Erro ao conectar MongoDB: ${error.message}`);
    console.error('');
    console.error('🔧 SOLUÇÕES:');
    console.error('1. Certifique-se que o MongoDB está rodando: mongod');
    console.error('2. Verifique a URI no arquivo backend/.env');
    console.error('3. Se usar MongoDB Atlas, verifique usuário/senha');
    console.error('4. Certifique-se que a URI inclui o nome do database');
    console.error('');
    process.exit(1);
  }
};

module.exports = connectDB;

