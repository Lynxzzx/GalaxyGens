# 🚀 Passo a Passo para Corrigir Erro de Login

## ⚡ Solução Rápida (Execute em ordem)

### 1️⃣ Criar o arquivo .env do backend

**Clique duas vezes em:**
```
CRIAR_ENV_WINDOWS.bat
```

Isso criará o arquivo `backend/.env` automaticamente.

---

### 2️⃣ Verificar se tudo está OK

**Clique duas vezes em:**
```
DIAGNOSTICO.bat
```

Isso verificará:
- ✅ Node.js instalado
- ✅ MongoDB instalado
- ✅ Arquivo .env criado
- ✅ Dependências instaladas

---

### 3️⃣ Instalar dependências (se necessário)

**Abra o PowerShell/CMD na pasta do projeto e execute:**
```cmd
npm run install:all
```

Aguarde a instalação (pode demorar alguns minutos).

---

### 4️⃣ Iniciar MongoDB

**Opção A - MongoDB Local:**

Abra um **novo terminal** e execute:
```cmd
mongod
```

**Deixe este terminal aberto!** Minimize, mas não feche.

**Opção B - MongoDB Atlas (nuvem):**

Se não tiver MongoDB instalado:
1. Crie conta grátis: https://www.mongodb.com/cloud/atlas/register
2. Crie um cluster M0 (grátis)
3. Obtenha a connection string
4. Edite `backend/.env` e substitua a linha MONGODB_URI

---

### 5️⃣ Criar o usuário Owner

**Abra um novo terminal e execute:**
```cmd
cd backend
node scripts/createOwner.js
```

Você verá:
```
✅ Owner criado com sucesso!
Usuário: Lynx
Senha: eliezermito1
Role: owner
```

---

### 6️⃣ Iniciar o Backend

**No mesmo terminal, execute:**
```cmd
npm run dev
```

Você deve ver:
```
🚀 Servidor rodando na porta 5000
MongoDB Conectado: localhost
📱 Telegram do desenvolvedor: t.me/lynxdevz
```

**Deixe este terminal aberto!**

---

### 7️⃣ Iniciar o Frontend

**Abra outro novo terminal e execute:**
```cmd
cd frontend
npm start
```

O navegador abrirá automaticamente em `http://localhost:3000`

---

### 8️⃣ Fazer Login

Na tela de login:
- **Usuário:** `Lynx`
- **Senha:** `eliezermito1`

Clique em **Entrar**

---

## ✅ Deve Funcionar!

Se funcionou, você verá:
- ✅ Mensagem: "Bem-vindo, Lynx!"
- ✅ Redirecionamento para o Dashboard
- ✅ Menu com opções: Dashboard, Gerador, Tickets, Planos, Admin

---

## 🐛 Se ainda der erro...

### Erro: "Backend não está respondendo"

**Solução:**
1. Verifique se o backend está rodando (terminal deve mostrar "Servidor rodando na porta 5000")
2. Se não estiver, execute:
   ```cmd
   cd backend
   npm run dev
   ```

### Erro: "ECONNREFUSED 127.0.0.1:27017"

**Solução:**
MongoDB não está rodando. Execute em um novo terminal:
```cmd
mongod
```

### Erro: "Cannot find module 'dotenv'"

**Solução:**
Dependências não instaladas. Execute:
```cmd
cd backend
npm install
cd ..
```

### Erro: "Credenciais inválidas"

**Solução:**
Owner não foi criado. Execute:
```cmd
cd backend
node scripts/createOwner.js
```

### Erro: "JsonWebTokenError"

**Solução:**
Arquivo .env não foi criado ou está incorreto. Execute:
```cmd
CRIAR_ENV_WINDOWS.bat
```

---

## 🔍 Ver logs de erro

Se ainda não funcionar, abra o **Console do navegador**:

1. Abra o navegador (Chrome/Edge/Firefox)
2. Pressione **F12**
3. Clique na aba **Console**
4. Tente fazer login novamente
5. Veja os erros no console (em vermelho)

Os logs mostrarão exatamente qual é o problema:
- 🔴 "ERR_NETWORK" → Backend não está rodando
- 🔴 "401" → Credenciais incorretas
- 🔴 "500" → Erro no servidor (MongoDB)

---

## 📱 Estrutura de Terminais

Para funcionar corretamente, você precisa de **3 terminais abertos**:

```
Terminal 1: MongoDB
├─ mongod
└─ [Deixar aberto]

Terminal 2: Backend
├─ cd backend
├─ npm run dev
└─ [Deixar aberto]

Terminal 3: Frontend
├─ cd frontend
├─ npm start
└─ [Deixar aberto]
```

---

## 🎯 Script Tudo-em-Um

Se preferir, use o script automático:

**Windows:**
```cmd
START.bat
```

Isso abrirá 2 terminais (backend e frontend).

**Importante:** Você ainda precisa iniciar o MongoDB manualmente!

---

## 📸 Como deve estar quando funcionar:

### Terminal do Backend:
```
🚀 Servidor rodando na porta 5000
MongoDB Conectado: localhost
📱 Telegram do desenvolvedor: t.me/lynxdevz
```

### Terminal do Frontend:
```
Compiled successfully!

You can now view galaxy-gens-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

### Navegador:
```
Tela de login aparece
Campos: Usuário e Senha
```

---

## 📋 Checklist Final

Marque cada item:

- [ ] Node.js instalado
- [ ] MongoDB instalado (ou Atlas configurado)
- [ ] Dependências instaladas (`npm run install:all`)
- [ ] Arquivo `backend/.env` criado (`CRIAR_ENV_WINDOWS.bat`)
- [ ] MongoDB rodando (`mongod`)
- [ ] Owner criado (`node scripts/createOwner.js`)
- [ ] Backend rodando (`npm run dev`)
- [ ] Frontend rodando (`npm start`)
- [ ] Navegador aberto em http://localhost:3000
- [ ] Login funcionando com Lynx / eliezermito1

---

## 💡 Dica Pro

Crie um atalho para iniciar tudo:

1. Crie um arquivo `INICIAR_TUDO.bat`
2. Cole:
   ```bat
   @echo off
   echo Iniciando MongoDB...
   start cmd /k mongod
   timeout /t 3 /nobreak > nul
   
   echo Iniciando Backend...
   start cmd /k "cd backend && npm run dev"
   timeout /t 3 /nobreak > nul
   
   echo Iniciando Frontend...
   start cmd /k "cd frontend && npm start"
   
   echo Tudo iniciado! Aguarde os terminais abrirem...
   ```
3. Execute este arquivo toda vez

---

## 📞 Suporte

Ainda com problemas?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

Envie:
1. Print do erro no navegador (console F12)
2. Print do terminal do backend
3. Resultado do comando: `DIAGNOSTICO.bat`

---

**Galaxy Gen's** © 2024-2025 - Desenvolvido por Lynx 👑



