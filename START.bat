@echo off
echo ========================================
echo    Galaxy Gen's - Inicializacao Rapida
echo    Desenvolvido por Lynx
echo ========================================
echo.

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo [1/3] Instalando dependencias...
    call npm run install:all
) else (
    echo [1/3] Dependencias ja instaladas!
)

echo.
echo [2/3] Iniciando Backend...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo [3/3] Iniciando Frontend...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Sistema iniciado com sucesso!
echo   Frontend: http://localhost:3000
echo   Backend: http://localhost:5000
echo   
echo   Login Owner:
echo   Usuario: Lynx
echo   Senha: eliezermito1
echo ========================================
echo.
pause



