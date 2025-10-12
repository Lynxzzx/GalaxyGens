const mongoose = require('mongoose');
require('dotenv').config();

console.log('========================================');
console.log('  Teste de Conexao MongoDB');
console.log('========================================\n');

const testConnection = async () => {
  try {
    console.log('URI Configurada:', process.env.MONGODB_URI);
    console.log('\nTentando conectar...\n');

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 segundos timeout
    });

    console.log('✅ SUCESSO! Conectado ao MongoDB!');
    console.log('📊 Informacoes da conexao:');
    console.log('- Host:', mongoose.connection.host);
    console.log('- Database:', mongoose.connection.name);
    console.log('- Estado:', mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado');
    
    // Listar databases
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    console.log('\n📚 Databases disponiveis:');
    databases.forEach(db => {
      console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });

    process.exit(0);
  } catch (error) {
    console.log('❌ ERRO ao conectar!');
    console.log('\n🔍 Detalhes do erro:');
    console.log('Tipo:', error.name);
    console.log('Mensagem:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\n⚠️  Possiveis causas:');
      console.log('1. Seu IP nao esta na whitelist do MongoDB Atlas');
      console.log('2. Usuario ou senha incorretos');
      console.log('3. Cluster pausado ou inativo');
      console.log('4. Problemas de rede/firewall');
      console.log('\n💡 Solucoes:');
      console.log('1. Acesse MongoDB Atlas');
      console.log('2. Va em Network Access');
      console.log('3. Adicione seu IP ou libere todos (0.0.0.0/0)');
    } else if (error.name === 'MongoParseError') {
      console.log('\n⚠️  A URI do MongoDB esta mal formatada!');
      console.log('\n💡 Formato correto:');
      console.log('mongodb+srv://usuario:senha@cluster.xxxxx.mongodb.net/nomedatabase');
    } else if (error.message.includes('Authentication failed')) {
      console.log('\n⚠️  Usuario ou senha incorretos!');
      console.log('\n💡 Verifique:');
      console.log('1. Usuario e senha no MongoDB Atlas');
      console.log('2. Se a senha tem caracteres especiais, use URL encoding');
    }

    process.exit(1);
  }
};

testConnection();


