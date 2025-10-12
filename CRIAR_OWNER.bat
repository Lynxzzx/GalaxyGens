@echo off
echo ========================================
echo  Criar Usuario Owner (Lynx)
echo ========================================
echo.

echo Verificando se estamos na pasta certa...
if not exist "backend" (
    echo ERRO: Pasta backend nao encontrada!
    echo Execute este arquivo na pasta raiz do projeto.
    pause
    exit /b 1
)

echo OK!
echo.

echo Verificando se MongoDB esta rodando...
sc query MongoDB | find "RUNNING" >nul 2>nul
if %errorlevel% neq 0 (
    echo MongoDB nao esta rodando. Iniciando...
    net start MongoDB >nul 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo ERRO: Nao foi possivel iniciar o MongoDB!
        echo Execute INICIAR_SIMPLES.bat primeiro.
        pause
        exit /b 1
    )
)

echo MongoDB esta rodando!
echo.

echo Verificando arquivo .env...
if not exist "backend\.env" (
    echo Criando arquivo .env...
    cd backend
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/galaxygens
        echo JWT_SECRET=galaxy_gens_super_secret_jwt_key_2024_lynx_dev
        echo MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
        echo NODE_ENV=development
    ) > .env
    cd ..
    echo Arquivo .env criado!
    echo.
)

echo Criando usuario Owner...
echo.
cd backend
node scripts/createOwner.js
cd ..

echo.
echo ========================================
echo  Processo concluido!
echo ========================================
echo.
echo Credenciais:
echo Usuario: Lynx
echo Senha: eliezermito1
echo.
echo Acesse: http://localhost:3000
echo.
pause


