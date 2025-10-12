@echo off
chcp 65001 >nul
echo ========================================
echo    Galaxy Gen's - Configuração Completa
echo    Desenvolvido por Lynx
echo ========================================
echo.

echo [1/5] Criando arquivo .env do backend...
cd backend
(
echo PORT=5000
echo MONGODB_URI=mongodb://localhost:27017/galaxygens
echo JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
echo MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
echo NODE_ENV=development
echo BACKEND_URL=http://localhost:5000
echo FRONTEND_URL=http://localhost:3000
) > .env
cd ..
echo ✅ Arquivo backend\.env criado!
echo.

echo [2/5] Criando arquivo .env do frontend...
cd frontend
(
echo REACT_APP_API_URL=http://localhost:5000/api
) > .env
cd ..
echo ✅ Arquivo frontend\.env criado!
echo.

echo [3/5] Instalando dependências...
echo (Isso pode demorar alguns minutos...)
call npm run install:all
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)
echo ✅ Dependências instaladas!
echo.

echo [4/5] Criando usuário Owner...
cd backend
call node scripts\createOwner.js
if %errorlevel% neq 0 (
    echo ⚠️  Owner já existe ou erro ao criar
) else (
    echo ✅ Owner criado com sucesso!
)
cd ..
echo.

echo [5/5] Verificando MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB não instalado!
    echo.
    echo Você tem duas opções:
    echo   1. Instalar MongoDB local: https://www.mongodb.com/try/download/community
    echo   2. Usar MongoDB Atlas (nuvem grátis): https://www.mongodb.com/cloud/atlas/register
    echo.
    echo Se usar Atlas, edite backend\.env e altere MONGODB_URI
) else (
    echo ✅ MongoDB está instalado!
    echo.
    echo IMPORTANTE: Antes de iniciar, execute em outro terminal:
    echo   mongod
)
echo.

echo ========================================
echo   CONFIGURAÇÃO CONCLUÍDA!
echo ========================================
echo.
echo 📋 PRÓXIMOS PASSOS:
echo.
echo 1. Abra um terminal e execute: mongod
echo    (Deixe rodando)
echo.
echo 2. Execute: npm run dev
echo    (Inicia backend e frontend)
echo.
echo 3. Acesse: http://localhost:3000
echo.
echo 4. Faça login:
echo    Usuário: Lynx
echo    Senha: eliezermito1
echo.
echo ========================================
echo.
pause



