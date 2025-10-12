# 🚨 SOLUÇÃO: Erro ao fazer login/registrar

## ⚡ Solução Rápida (3 comandos)

Execute estes comandos em ordem:

### 1. Configure tudo automaticamente:
```cmd
CONFIGURAR_TUDO.bat
```

### 2. Inicie o MongoDB (novo terminal):
```cmd
mongod
```

### 3. Inicie o sistema:
```cmd
npm run dev
```

**Pronto!** Acesse http://localhost:3000 e faça login:
- Usuário: `Lynx`
- Senha: `eliezermito1`

---

## 🔍 O que o erro significa?

### "Erro ao fazer login" ou "Erro ao registrar"

**Causas mais comuns:**

1. ❌ **Backend não está rodando**
   - Solução: Execute `cd backend` e depois `npm run dev`

2. ❌ **MongoDB não está rodando**
   - Solução: Execute `mongod` em outro terminal

3. ❌ **Arquivo .env não existe**
   - Solução: Execute `CRIAR_ENV_WINDOWS.bat`

4. ❌ **Dependências não instaladas**
   - Solução: Execute `npm run install:all`

5. ❌ **Owner não foi criado**
   - Solução: Execute `cd backend` e `node scripts/createOwner.js`

---

## 📋 Checklist de Verificação

Execute `DIAGNOSTICO.bat` para verificar tudo automaticamente.

Ou verifique manualmente:

- [ ] Node.js instalado? → `node --version`
- [ ] MongoDB instalado? → `mongod --version`
- [ ] Arquivo `backend/.env` existe?
- [ ] Arquivo `frontend/.env` existe?
- [ ] Dependências instaladas? → Pasta `node_modules` existe?
- [ ] MongoDB rodando? → Terminal com `mongod` aberto
- [ ] Backend rodando? → Terminal mostra "Servidor rodando na porta 5000"
- [ ] Frontend rodando? → Navegador abriu em localhost:3000

---

## 🐛 Debugging

### Ver erro exato

1. Abra o navegador (Chrome/Edge)
2. Pressione **F12**
3. Clique na aba **Console**
4. Tente fazer login
5. Veja o erro em vermelho

### Erros comuns no console:

**"ERR_NETWORK"** ou **"Network Error"**
→ Backend não está rodando
→ Solução: `cd backend` e `npm run dev`

**"401 Unauthorized"**
→ Credenciais incorretas
→ Solução: Use `Lynx` / `eliezermito1`

**"500 Internal Server Error"**
→ MongoDB não conectou
→ Solução: Execute `mongod` em outro terminal

**"Cannot find module 'dotenv'"**
→ Dependências não instaladas
→ Solução: `npm run install:all`

---

## 🎯 Comandos Úteis

```cmd
# Ver se backend está rodando
curl http://localhost:5000

# Reinstalar tudo
npm run install:all

# Recriar Owner
cd backend
node scripts/createOwner.js

# Ver logs do backend
cd backend
npm run dev

# Ver logs do frontend
cd frontend
npm start
```

---

## 📁 Estrutura de Arquivos Necessários

```
galaxy-gens/
├── backend/
│   ├── .env              ← Deve existir!
│   ├── node_modules/     ← Deve existir!
│   └── ...
├── frontend/
│   ├── .env              ← Deve existir!
│   ├── node_modules/     ← Deve existir!
│   └── ...
└── ...
```

---

## 🔧 Criar arquivos .env manualmente

Se os scripts não funcionarem, crie manualmente:

### backend/.env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### frontend/.env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📱 Terminais Necessários

Você precisa de **3 terminais** abertos simultaneamente:

```
Terminal 1: mongod
Terminal 2: cd backend && npm run dev
Terminal 3: cd frontend && npm start
```

Ou use o script automático:
```cmd
npm run dev
```
(Ainda precisa do mongod separado)

---

## ✅ Como saber se está funcionando

### Terminal do Backend deve mostrar:
```
🚀 Servidor rodando na porta 5000
MongoDB Conectado: localhost
```

### Terminal do Frontend deve mostrar:
```
Compiled successfully!
Local: http://localhost:3000
```

### Navegador deve mostrar:
```
Tela de login do Galaxy Gen's
```

---

## 📞 Ainda não funcionou?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

Envie:
1. Print do erro (console F12)
2. Print do terminal backend
3. Resultado de `DIAGNOSTICO.bat`

---

## 🎬 Tutorial em Vídeo

Execute passo a passo:

1. `CONFIGURAR_TUDO.bat` (aguarde finalizar)
2. Novo terminal: `mongod` (deixe aberto)
3. Novo terminal: `npm run dev` (aguarde abrir navegador)
4. No navegador: Login com `Lynx` / `eliezermito1`

**Pronto!** ✅

---

**Galaxy Gen's** © 2024-2025 - Desenvolvido por Lynx 👑



