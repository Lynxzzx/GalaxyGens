@echo off
echo ========================================
echo  Instalador do MongoDB para Windows
echo ========================================
echo.

echo Este script ira:
echo 1. Baixar o MongoDB Community Edition
echo 2. Instalar o MongoDB
echo 3. Configurar como servico do Windows
echo.
echo Pressione qualquer tecla para continuar ou CTRL+C para cancelar...
pause > nul

echo.
echo Verificando se o Chocolatey esta instalado...
where choco >nul 2>nul
if %errorlevel% equ 0 (
    echo Chocolatey encontrado! Instalando MongoDB via Chocolatey...
    choco install mongodb -y
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo  MongoDB instalado com sucesso!
        echo ========================================
        echo.
        echo Por favor, FECHE e REABRA o terminal para que as
        echo variaveis de ambiente sejam atualizadas.
        echo.
        pause
        exit /b 0
    ) else (
        echo Erro ao instalar via Chocolatey. Tentando metodo alternativo...
    )
)

echo.
echo Chocolatey nao encontrado. Abrindo pagina de download do MongoDB...
echo.
echo Por favor, baixe e instale manualmente:
echo 1. Selecione a versao mais recente
echo 2. Escolha "Windows" como plataforma
echo 3. Execute o instalador
echo 4. Marque "Install MongoDB as a Service"
echo.

start https://www.mongodb.com/try/download/community

echo.
echo Apos instalar o MongoDB:
echo 1. Feche e reabra o terminal
echo 2. Execute: INICIAR_SIMPLES.bat
echo.
pause


