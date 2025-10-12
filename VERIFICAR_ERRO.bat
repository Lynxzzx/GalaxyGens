@echo off
title Verificar Erros - Galaxy Gen's
color 0C

echo ========================================
echo  VERIFICACAO DE ERROS
echo ========================================
echo.

echo [TESTE 1] Verificando pastas...
echo.
if exist "backend" (
    echo [OK] Pasta backend existe
) else (
    echo [ERRO] Pasta backend NAO existe!
    echo        Voce esta na pasta errada?
)

if exist "frontend" (
    echo [OK] Pasta frontend existe
) else (
    echo [ERRO] Pasta frontend NAO existe!
    echo        Voce esta na pasta errada?
)
echo.

echo [TESTE 2] Verificando Node.js...
echo.
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js instalado
    node --version
) else (
    echo [ERRO] Node.js NAO instalado!
    echo        Baixe em: https://nodejs.org/
)
echo.

echo [TESTE 3] Verificando npm...
echo.
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm instalado
    npm --version
) else (
    echo [ERRO] npm NAO instalado!
)
echo.

echo [TESTE 4] Verificando arquivo .env...
echo.
if exist "backend\.env" (
    echo [OK] backend\.env existe
    echo Conteudo:
    type "backend\.env"
) else (
    echo [ERRO] backend\.env NAO existe!
    echo        Execute: CRIAR_ENV_WINDOWS.bat
)
echo.

echo [TESTE 5] Verificando node_modules...
echo.
if exist "backend\node_modules" (
    echo [OK] Dependencias do backend instaladas
) else (
    echo [ERRO] Dependencias do backend NAO instaladas!
    echo        Execute: cd backend e depois: npm install
)

if exist "frontend\node_modules" (
    echo [OK] Dependencias do frontend instaladas
) else (
    echo [ERRO] Dependencias do frontend NAO instaladas!
    echo        Execute: cd frontend e depois: npm install
)
echo.

echo [TESTE 6] Verificando MongoDB...
echo.
mongod --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB instalado
    mongod --version | findstr "version"
) else (
    echo [AVISO] MongoDB NAO instalado
    echo          Instale: https://www.mongodb.com/try/download/community
    echo          Ou use MongoDB Atlas
)
echo.

echo ========================================
echo  RESUMO
echo ========================================
echo.
echo Se todos os testes passaram [OK], execute:
echo   INICIAR_SIMPLES.bat
echo.
echo Se algum teste falhou [ERRO]:
echo   1. Corrija o erro mostrado acima
echo   2. Execute este script novamente
echo.
echo Precisa de ajuda?
echo   Telegram: t.me/lynxdevz
echo.
echo ========================================
echo.
pause



