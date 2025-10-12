@echo off
title Galaxy Gen's - Inicializador
color 0A

echo.
echo ========================================
echo    Galaxy Gen's - Launcher
echo    Desenvolvido por Lynx
echo ========================================
echo.

REM Verificar se estamos na pasta certa
if not exist "backend" (
    echo ERRO: Pasta backend nao encontrada!
    echo.
    echo Execute este script na pasta raiz do projeto.
    echo.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ERRO: Pasta frontend nao encontrada!
    echo.
    echo Execute este script na pasta raiz do projeto.
    echo.
    pause
    exit /b 1
)

REM Verificar se .env existe
echo [1/5] Verificando arquivos de configuracao...
if not exist "backend\.env" (
    echo.
    echo Arquivo backend\.env nao encontrado!
    echo Criando agora...
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
    cd ..
    
    echo Arquivo criado com sucesso!
)
echo OK: backend\.env existe
echo.

REM Verificar dependências
echo [2/5] Verificando dependencias...
if not exist "backend\node_modules" (
    echo.
    echo Dependencias do backend nao instaladas!
    echo Instalando agora... (pode demorar alguns minutos)
    echo.
    cd backend
    call npm install
    cd ..
)
echo OK: Dependencias do backend OK
echo.

if not exist "frontend\node_modules" (
    echo.
    echo Dependencias do frontend nao instaladas!
    echo Instalando agora... (pode demorar alguns minutos)
    echo.
    cd frontend
    call npm install
    cd ..
)
echo OK: Dependencias do frontend OK
echo.

REM Verificar MongoDB
echo [3/5] Verificando MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo AVISO: MongoDB nao esta instalado!
    echo.
    echo Voce tem 2 opcoes:
    echo   1. Instalar MongoDB local: https://www.mongodb.com/try/download/community
    echo   2. Usar MongoDB Atlas (nuvem): https://www.mongodb.com/cloud/atlas/register
    echo.
    echo Por enquanto, vou tentar iniciar sem o MongoDB.
    echo Se der erro, instale o MongoDB e tente novamente.
    echo.
    pause
) else (
    echo OK: MongoDB instalado
)
echo.

REM Criar Owner se não existe
echo [4/5] Verificando usuario Owner...
cd backend
call node scripts\createOwner.js 2>nul
if %errorlevel% neq 0 (
    echo AVISO: Erro ao criar Owner ou ja existe
)
cd ..
echo.

echo [5/5] Iniciando servicos...
echo.

REM Iniciar MongoDB
echo Iniciando MongoDB...
start "MongoDB - Galaxy Gen's" cmd /k "title MongoDB - Galaxy Gen's && echo MongoDB - Galaxy Gen's && echo. && mongod"
timeout /t 3 /nobreak > nul
echo OK: MongoDB iniciado
echo.

REM Iniciar Backend
echo Iniciando Backend...
start "Backend - Galaxy Gen's" cmd /k "title Backend - Galaxy Gen's && cd backend && echo Backend - Galaxy Gen's && echo. && npm run dev"
timeout /t 5 /nobreak > nul
echo OK: Backend iniciado
echo.

REM Iniciar Frontend
echo Iniciando Frontend...
start "Frontend - Galaxy Gen's" cmd /k "title Frontend - Galaxy Gen's && cd frontend && echo Frontend - Galaxy Gen's && echo. && npm start"
echo OK: Frontend iniciado
echo.

echo ========================================
echo   SISTEMA INICIADO!
echo ========================================
echo.
echo 3 terminais foram abertos:
echo   1. MongoDB (banco de dados)
echo   2. Backend (servidor API)
echo   3. Frontend (interface web)
echo.
echo O navegador abrira automaticamente em:
echo   http://localhost:3000
echo.
echo Login:
echo   Usuario: Lynx
echo   Senha: eliezermito1
echo.
echo IMPORTANTE: Nao feche os terminais!
echo.
echo Se algo nao funcionar:
echo   1. Execute: DIAGNOSTICO.bat
echo   2. Telegram: t.me/lynxdevz
echo.
echo ========================================
echo.
pause

