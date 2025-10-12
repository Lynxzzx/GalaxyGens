@echo off
echo ========================================
echo  DIAGNOSTICO - Galaxy Gen's
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js não instalado!
    echo Baixe em: https://nodejs.org/
    pause
    exit
)
echo ✅ Node.js instalado
echo.

echo [2/5] Verificando MongoDB...
mongod --version
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB não encontrado ou não instalado
    echo Baixe em: https://www.mongodb.com/try/download/community
) else (
    echo ✅ MongoDB instalado
)
echo.

echo [3/5] Verificando arquivo .env...
if exist "backend\.env" (
    echo ✅ Arquivo .env existe
    echo Conteúdo:
    type backend\.env
) else (
    echo ❌ Arquivo .env NÃO existe!
    echo Execute: CRIAR_ENV_WINDOWS.bat
)
echo.

echo [4/5] Verificando dependências do backend...
cd backend
if exist "node_modules" (
    echo ✅ Dependências do backend instaladas
) else (
    echo ❌ Dependências do backend NÃO instaladas
    echo Execute: npm install
)
cd ..
echo.

echo [5/5] Verificando dependências do frontend...
cd frontend
if exist "node_modules" (
    echo ✅ Dependências do frontend instaladas
) else (
    echo ❌ Dependências do frontend NÃO instaladas
    echo Execute: npm install
)
cd ..
echo.

echo ========================================
echo  RESUMO
echo ========================================
echo.
echo Para criar o .env: CRIAR_ENV_WINDOWS.bat
echo Para iniciar MongoDB: mongod
echo Para instalar tudo: npm run install:all
echo Para iniciar sistema: npm run dev
echo.
pause



