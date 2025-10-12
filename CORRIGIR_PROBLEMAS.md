# 🔧 Correção de Problemas de Login/Registro

## 🚨 Problema: "Erro ao fazer login" ou "Erro ao registrar"

### ✅ Solução Rápida (3 Passos)

#### 1️⃣ Criar o arquivo .env

**Execute este comando:**

```cmd
CRIAR_ENV_WINDOWS.bat
```

**Ou crie manualmente:**

1. Abra o Bloco de Notas
2. Cole este conteúdo:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

3. Salve como: `backend\.env` (com ponto no início!)
4. Tipo: "Todos os arquivos (*.*)"

#### 2️⃣ Iniciar o MongoDB

**Abra um novo terminal e execute:**

```cmd
mongod
```

**Deixe este terminal aberto!** O MongoDB precisa estar rodando.

Se não funcionar:
- Instale MongoDB: https://www.mongodb.com/try/download/community
- Ou use MongoDB Atlas (nuvem): https://www.mongodb.com/cloud/atlas/register

#### 3️⃣ Criar o usuário Owner

**Em outro terminal:**

```cmd
cd backend
node scripts/createOwner.js
```

Você verá:
```
✅ Owner criado com sucesso!
Usuário: Lynx
Senha: eliezermito1
```

---

## 🔍 Diagnóstico Completo

Execute para verificar tudo:

```cmd
DIAGNOSTICO.bat
```

---

## 🐛 Problemas Específicos

### Problema 1: "Cannot find module 'dotenv'"

**Causa:** Dependências não instaladas

**Solução:**
```cmd
cd backend
npm install
cd ..
```

### Problema 2: "ECONNREFUSED 127.0.0.1:27017"

**Causa:** MongoDB não está rodando

**Solução:**
```cmd
mongod
```

Deixe o terminal aberto.

### Problema 3: "Network Error" no frontend

**Causa:** Backend não está rodando

**Solução:**
```cmd
cd backend
npm run dev
```

### Problema 4: "Credenciais inválidas"

**Causa:** Owner não foi criado

**Solução:**
```cmd
cd backend
node scripts/createOwner.js
```

### Problema 5: "JsonWebTokenError"

**Causa:** JWT_SECRET não configurado

**Solução:**
1. Execute: `CRIAR_ENV_WINDOWS.bat`
2. Ou adicione no `.env`:
```env
JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
```

### Problema 6: CORS Error

**Causa:** Backend e frontend em portas diferentes

**Solução:** Já está configurado! Certifique-se que:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

---

## 📋 Checklist Completo

Execute cada item em ordem:

- [ ] **1. Instalar dependências**
  ```cmd
  npm run install:all
  ```

- [ ] **2. Criar arquivo .env**
  ```cmd
  CRIAR_ENV_WINDOWS.bat
  ```

- [ ] **3. Iniciar MongoDB** (deixe aberto)
  ```cmd
  mongod
  ```

- [ ] **4. Criar Owner**
  ```cmd
  cd backend
  node scripts/createOwner.js
  cd ..
  ```

- [ ] **5. Iniciar Backend** (novo terminal)
  ```cmd
  cd backend
  npm run dev
  ```

- [ ] **6. Iniciar Frontend** (novo terminal)
  ```cmd
  cd frontend
  npm start
  ```

- [ ] **7. Testar Login**
  - Acesse: http://localhost:3000
  - Usuário: `Lynx`
  - Senha: `eliezermito1`

---

## 🎯 Início Rápido (Todos os comandos)

**Terminal 1 - MongoDB:**
```cmd
mongod
```

**Terminal 2 - Backend:**
```cmd
CRIAR_ENV_WINDOWS.bat
cd backend
node scripts/createOwner.js
npm run dev
```

**Terminal 3 - Frontend:**
```cmd
cd frontend
npm start
```

**Navegador:**
```
http://localhost:3000
```

---

## 📱 Console do Navegador

Se ainda der erro, abra o Console do navegador (F12) e veja o erro exato.

**Erros comuns:**

1. **"Failed to fetch"** → Backend não está rodando
2. **"Network Error"** → URL errada ou CORS
3. **"401 Unauthorized"** → Credenciais erradas
4. **"500 Internal Server Error"** → MongoDB não conectou

---

## 🔄 Recomeçar do Zero

Se nada funcionar:

```cmd
# 1. Limpar tudo
cd backend
rmdir /s /q node_modules
cd ../frontend
rmdir /s /q node_modules
cd ..

# 2. Reinstalar
npm run install:all

# 3. Criar .env
CRIAR_ENV_WINDOWS.bat

# 4. Criar Owner
cd backend
node scripts/createOwner.js
cd ..

# 5. Iniciar
npm run dev
```

---

## 📸 Como deve aparecer quando funcionar:

**Backend (Terminal):**
```
🚀 Servidor rodando na porta 5000
MongoDB Conectado: localhost
📱 Telegram do desenvolvedor: t.me/lynxdevz
```

**Frontend (Navegador):**
```
Tela de login aparece
```

**Após Login:**
```
Redirecionamento para Dashboard
Mensagem: "Bem-vindo, Lynx!"
```

---

## 💬 Ainda com problemas?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

Envie:
1. Print do erro no console (F12)
2. Print do terminal do backend
3. Conteúdo do arquivo `backend/.env`

---

**Galaxy Gen's** - Desenvolvido por Lynx 👑



