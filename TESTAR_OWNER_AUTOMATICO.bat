@echo off
echo ========================================
echo  Teste: Criacao Automatica do Owner
echo ========================================
echo.

echo Este script vai testar se o Owner esta sendo
echo criado automaticamente ao iniciar o backend.
echo.

echo Verificando se estamos na pasta certa...
if not exist "backend" (
    echo ERRO: Pasta backend nao encontrada!
    pause
    exit /b 1
)

echo OK!
echo.

echo ========================================
echo  Teste 1: Conectar ao MongoDB
echo ========================================
echo.

cd backend
echo Testando conexao...
node scripts/testConnection.js

if %errorlevel% neq 0 (
    echo.
    echo ERRO: MongoDB nao esta conectando!
    echo Execute INICIAR_SIMPLES.bat primeiro.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Teste 2: Verificar Owner Atual
echo ========================================
echo.

echo Verificando se Owner existe...
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(async () => { const User = require('./models/User'); const owner = await User.findOne({ username: 'Lynx' }); if (owner) { console.log('✅ Owner encontrado!'); console.log('   Usuario:', owner.username); console.log('   Cargo:', owner.role); console.log('   Status:', owner.isActive ? 'Ativo' : 'Inativo'); } else { console.log('❌ Owner nao encontrado'); } process.exit(0); });"

echo.
echo ========================================
echo  Teste 3: Iniciar Backend (5 segundos)
echo ========================================
echo.

echo Iniciando backend para verificar criacao automatica...
echo (Aguarde 5 segundos)
echo.

start "Teste Backend" cmd /c "npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo ========================================
echo  Resultado
echo ========================================
echo.

echo ✅ Se voce viu a mensagem:
echo    "Criando usuario Owner automaticamente..."
echo    ou
echo    "Usuario Owner ja existe no database"
echo.
echo Entao esta funcionando perfeitamente!
echo.

echo Voce pode fechar a janela do backend que abriu.
echo.

cd ..
pause


