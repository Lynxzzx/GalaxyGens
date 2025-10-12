@echo off
echo ========================================
echo  Testando Backend - Galaxy Gen's
echo ========================================
echo.

echo [1/3] Testando se o backend está respondendo...
curl http://localhost:5000
echo.
echo.

echo [2/3] Testando rota de auth...
curl http://localhost:5000/api/auth/me
echo.
echo.

echo [3/3] Testando conexão com MongoDB...
echo (Se o backend está rodando, você verá as respostas acima)
echo.

echo ========================================
echo  RESULTADO
echo ========================================
echo.
echo Se você viu JSON acima, o backend está funcionando!
echo.
echo Se viu "Connection refused" ou erro:
echo   1. Execute: cd backend
echo   2. Execute: npm run dev
echo   3. Execute este script novamente
echo.
pause



