#!/bin/bash

echo "========================================"
echo " Criando arquivo .env para o backend"
echo "========================================"
echo ""

cd backend

cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
EOL

echo ""
echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "Localização: backend/.env"
echo ""
echo "========================================"
echo " Próximos passos:"
echo "========================================"
echo "1. Certifique-se que o MongoDB está rodando"
echo "2. Execute: npm run dev"
echo ""



