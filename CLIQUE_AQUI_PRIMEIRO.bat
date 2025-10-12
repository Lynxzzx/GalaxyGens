@echo off
color 0E
title DESCUBRA O ERRO - Galaxy Gen's

echo.
echo ================================================
echo   VERIFICANDO O QUE ESTA ERRADO...
echo ================================================
echo.

REM Teste 1: Pastas
echo [TESTE 1/6] Verificando se estou na pasta certa...
if not exist "backend" (
    color 0C
    echo.
    echo [X] ERRO: Pasta backend NAO encontrada!
    echo.
    echo SOLUCAO:
    echo   1. Abra a pasta onde estao os arquivos do projeto
    echo   2. Voce deve ver as pastas: backend e frontend
    echo   3. Execute este script de dentro dessa pasta
    echo.
    pause
    exit /b 1
)

if not exist "frontend" (
    color 0C
    echo.
    echo [X] ERRO: Pasta frontend NAO encontrada!
    echo.
    echo SOLUCAO:
    echo   Execute este script na pasta raiz do projeto
    echo.
    pause
    exit /b 1
)
echo [OK] Pastas encontradas!
echo.

REM Teste 2: Node.js
echo [TESTE 2/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [X] ERRO: Node.js NAO instalado!
    echo.
    echo SOLUCAO:
    echo   1. Baixe: https://nodejs.org/
    echo   2. Instale (versao LTS)
    echo   3. Reinicie o computador
    echo   4. Execute este script novamente
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js instalado!
node --version
echo.

REM Teste 3: Arquivo .env
echo [TESTE 3/6] Verificando arquivo .env...
if not exist "backend\.env" (
    echo [!] Arquivo backend\.env nao existe
    echo     Criando agora...
    
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
    
    echo [OK] Arquivo criado com sucesso!
) else (
    echo [OK] Arquivo backend\.env existe!
)
echo.

REM Teste 4: Dependências Backend
echo [TESTE 4/6] Verificando dependencias do backend...
if not exist "backend\node_modules" (
    echo [!] Dependencias do backend NAO instaladas
    echo     Instalando agora... (pode demorar 5-10 minutos)
    echo.
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [X] ERRO ao instalar dependencias!
        echo.
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Instalado!
) else (
    echo [OK] Dependencias do backend OK!
)
echo.

REM Teste 5: Dependências Frontend
echo [TESTE 5/6] Verificando dependencias do frontend...
if not exist "frontend\node_modules" (
    echo [!] Dependencias do frontend NAO instaladas
    echo     Instalando agora... (pode demorar 5-10 minutos)
    echo.
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [X] ERRO ao instalar dependencias!
        echo.
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Instalado!
) else (
    echo [OK] Dependencias do frontend OK!
)
echo.

REM Teste 6: MongoDB
echo [TESTE 6/6] Verificando MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0E
    echo [!] AVISO: MongoDB nao instalado
    echo.
    echo Voce tem 2 opcoes:
    echo   1. Instalar local: https://www.mongodb.com/try/download/community
    echo   2. Usar nuvem (gratis): https://www.mongodb.com/cloud/atlas/register
    echo.
    echo O sistema tentara iniciar mesmo sem MongoDB...
) else (
    echo [OK] MongoDB instalado!
)
echo.

color 0A
echo ================================================
echo   VERIFICACAO CONCLUIDA!
echo ================================================
echo.
echo Tudo parece OK!
echo.
echo PROXIMOS PASSOS:
echo   1. Feche esta janela
echo   2. Execute: INICIAR_SIMPLES.bat
echo.
echo ================================================
echo.
pause



