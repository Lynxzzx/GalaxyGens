@echo off
echo ========================================
echo  Criando arquivo .env para o backend
echo ========================================
echo.

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

echo.
echo ✅ Arquivo .env criado com sucesso!
echo.
echo Localização: backend\.env
echo.
echo ========================================
echo  Próximos passos:
echo ========================================
echo 1. Certifique-se que o MongoDB está rodando
echo 2. Execute: npm run dev
echo.
pause


