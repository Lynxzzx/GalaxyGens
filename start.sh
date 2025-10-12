#!/bin/bash

echo "========================================"
echo "   Galaxy Gen's - Inicializacao Rapida"
echo "   Desenvolvido por Lynx"
echo "========================================"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "[1/3] Instalando dependencias..."
    npm run install:all
else
    echo "[1/3] Dependencias ja instaladas!"
fi

echo ""
echo "[2/3] Iniciando Backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 3

echo ""
echo "[3/3] Iniciando Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Sistema iniciado com sucesso!"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:5000"
echo "  "
echo "  Login Owner:"
echo "  Usuario: Lynx"
echo "  Senha: eliezermito1"
echo "========================================"
echo ""
echo "Pressione Ctrl+C para parar os servidores"

# Aguardar interrupção
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait



