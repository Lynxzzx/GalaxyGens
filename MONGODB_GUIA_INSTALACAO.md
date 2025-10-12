# 📦 Guia de Instalação do MongoDB no Windows

## ⚠️ Problema
O erro "mongod não existe" significa que o MongoDB não está instalado ou não está no PATH do sistema.

## 🔧 Solução Rápida

### Método 1: Instalação Manual (Recomendado)

1. **Baixe o MongoDB:**
   - Acesse: https://www.mongodb.com/try/download/community
   - Versão: MongoDB Community Server (versão mais recente)
   - Plataforma: Windows
   - Formato: MSI

2. **Instale:**
   - Execute o arquivo `.msi` baixado
   - Escolha "Complete Installation"
   - ✅ **MARQUE:** "Install MongoDB as a Service"
   - ✅ **MARQUE:** "Run service as Network Service user"
   - Pode DESMARCAR "Install MongoDB Compass" (interface gráfica opcional)

3. **Verifique a instalação:**
   - Abra um NOVO terminal (PowerShell ou CMD)
   - Execute: `mongod --version`
   - Se aparecer a versão, está instalado!

### Método 2: Usando Chocolatey (Automático)

Se você tem o Chocolatey instalado:

```powershell
# Execute como Administrador
choco install mongodb -y
```

### Método 3: Usando o script automático

Execute o arquivo que criei:
```
INSTALAR_MONGODB.bat
```

## 🎯 Configurar PATH (Se necessário)

Se após instalar o mongod ainda não for reconhecido:

1. **Encontre a pasta de instalação do MongoDB:**
   - Padrão: `C:\Program Files\MongoDB\Server\8.0\bin`
   - Ou: `C:\Program Files\MongoDB\Server\7.0\bin`

2. **Adicione ao PATH:**
   - Pressione `Win + R`
   - Digite: `sysdm.cpl` e pressione Enter
   - Vá para a aba "Avançado"
   - Clique em "Variáveis de Ambiente"
   - Em "Variáveis do sistema", encontre "Path" e clique em "Editar"
   - Clique em "Novo" e adicione: `C:\Program Files\MongoDB\Server\8.0\bin`
   - Clique em "OK" em todas as janelas

3. **IMPORTANTE:** Feche e reabra todos os terminais!

## 🚀 Iniciando o MongoDB

### Como Serviço (Automático - Recomendado)

Se você instalou como serviço, o MongoDB já está rodando automaticamente!

Para verificar:
```powershell
# No PowerShell como Administrador
Get-Service MongoDB
```

Para iniciar/parar:
```powershell
# Iniciar
net start MongoDB

# Parar
net stop MongoDB
```

### Manualmente (Se não instalou como serviço)

1. **Crie as pastas de dados:**
```powershell
mkdir C:\data\db
```

2. **Inicie o MongoDB:**
```powershell
mongod
```

## ✅ Verificar se está funcionando

1. **Abra um novo terminal**
2. **Execute:**
```powershell
mongod --version
```

Se aparecer a versão, está tudo certo!

## 🔄 Depois de Instalar

1. **Feche TODOS os terminais abertos**
2. **Abra um NOVO terminal**
3. **Execute:** `INICIAR_SIMPLES.bat`

## 💡 Alternativa: MongoDB Atlas (Nuvem - Grátis)

Se não quiser instalar localmente, use o MongoDB Atlas (nuvem):

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta grátis
3. Crie um cluster gratuito
4. Obtenha a string de conexão
5. No arquivo `backend\.env`, altere:
   ```
   MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster0.xxxxx.mongodb.net/galaxygens
   ```

## 🆘 Problemas Comuns

### "mongod não é reconhecido"
- Feche e reabra o terminal
- Verifique se adicionou ao PATH
- Verifique se instalou corretamente

### "Erro ao conectar no MongoDB"
- Verifique se o serviço está rodando: `Get-Service MongoDB`
- Inicie o serviço: `net start MongoDB`
- Ou execute `mongod` manualmente

### "Access Denied"
- Execute o terminal como Administrador

## 📝 Links Úteis

- Download: https://www.mongodb.com/try/download/community
- Documentação: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- MongoDB Compass (GUI): https://www.mongodb.com/products/compass

---

**Desenvolvido por Lynx** 🌟


