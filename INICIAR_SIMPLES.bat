@echo off
echo ========================================
echo  Iniciando Galaxy Gen's
echo ========================================
echo.

echo Verificando se estamos na pasta certa...
if not exist "backend" (
    echo ERRO: Pasta backend nao encontrada!
    echo Certifique-se de executar na pasta raiz do projeto.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ERRO: Pasta frontend nao encontrada!
    echo Certifique-se de executar na pasta raiz do projeto.
    pause
    exit /b 1
)

echo OK!
echo.

echo Verificando se MongoDB esta instalado...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo  ERRO: MongoDB nao encontrado!
    echo ========================================
    echo.
    echo O MongoDB nao esta instalado ou nao esta no PATH.
    echo.
    echo Para instalar:
    echo 1. Execute: INSTALAR_MONGODB.bat
    echo 2. Ou leia: MONGODB_GUIA_INSTALACAO.md
    echo.
    pause
    exit /b 1
)

echo MongoDB encontrado!
echo.

echo Verificando se MongoDB esta rodando como servico...
sc query MongoDB | find "RUNNING" >nul 2>nul
if %errorlevel% equ 0 (
    echo MongoDB ja esta rodando como servico!
    echo.
) else (
    echo Tentando iniciar servico MongoDB...
    net start MongoDB >nul 2>nul
    if %errorlevel% equ 0 (
        echo Servico MongoDB iniciado!
        echo.
    ) else (
        echo MongoDB nao esta configurado como servico.
        echo Iniciando MongoDB manualmente...
        start "MongoDB" cmd /k "mongod"
        timeout /t 3 /nobreak > nul
        echo.
    )
)
echo.

echo Iniciando Backend...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
echo.

echo Iniciando Frontend...
start "Frontend" cmd /k "cd frontend && npm start"
echo.

echo ========================================
echo  Tudo iniciado!
echo ========================================
echo.
echo Acesse: http://localhost:3000
echo.
echo Credenciais do Owner:
echo Usuario: Lynx
echo Senha: eliezermito1
echo.
echo (Usuario Owner criado automaticamente)
echo.
pause


