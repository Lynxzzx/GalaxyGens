# 🔧 Como Criar o Arquivo .env

## ⚡ Método Rápido

### Windows (Prompt de Comando)
```cmd
cd backend
copy .env.example .env
notepad .env
```

### Windows (PowerShell)
```powershell
cd backend
Copy-Item .env.example .env
notepad .env
```

### Mac/Linux
```bash
cd backend
cp .env.example .env
nano .env
```

---

## 📝 Conteúdo para Copiar

Copie e cole isso no arquivo `backend/.env`:

```env
# ========================================
#  GALAXY GEN'S - CONFIGURAÇÕES
#  Desenvolvido por Lynx
# ========================================

PORT=5000

# MONGODB - Escolha uma opção:

# Opção 1: Local (para testes)
MONGODB_URI=mongodb://localhost:27017/galaxygens

# Opção 2: MongoDB Atlas (produção)
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/galaxygens?retryWrites=true&w=majority

# JWT SECRET - IMPORTANTE: Gere uma string única!
# Execute: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=galaxygens_jwt_secret_super_secreto_2024_lynx_mude_isso_em_producao

# MERCADO PAGO - Deixe assim para usar modo teste
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui

# AMBIENTE
NODE_ENV=development

# URLs (opcional)
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

---

## ✏️ O que você DEVE mudar:

### 1. JWT_SECRET (OBRIGATÓRIO para produção)

**Gere uma string aleatória:**

**No terminal (dentro da pasta backend):**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Copie o resultado e substitua no .env:**
```env
JWT_SECRET=sua_string_gerada_aqui
```

### 2. MONGODB_URI (se for usar MongoDB Atlas)

**Passos:**
1. Crie conta grátis: https://www.mongodb.com/cloud/atlas/register
2. Crie um cluster M0 (grátis)
3. Crie um usuário de banco de dados
4. Permita acesso de qualquer IP (0.0.0.0/0)
5. Pegue a connection string
6. Substitua `<password>` pela senha
7. Cole no .env:

```env
MONGODB_URI=mongodb+srv://usuario:senha_real@cluster0.abc123.mongodb.net/galaxygens?retryWrites=true&w=majority
```

### 3. MERCADOPAGO_ACCESS_TOKEN (opcional)

**Só mude se quiser pagamentos reais:**

1. Crie conta: https://www.mercadopago.com.br/
2. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
3. Copie o Access Token (teste ou produção)
4. Cole no .env:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-1234567890123456-010101-abc123def456-789012345
```

---

## ✅ Checklist

- [ ] Arquivo `backend/.env` criado
- [ ] PORT definida (5000)
- [ ] MONGODB_URI configurada
- [ ] JWT_SECRET gerada (string aleatória)
- [ ] NODE_ENV definido (development)
- [ ] Arquivo salvo

---

## 🧪 Testar se está correto

```bash
cd backend
npm run dev
```

Se aparecer:
```
🚀 Servidor rodando na porta 5000
MongoDB Conectado: ...
```

✅ **Está tudo certo!**

---

## 🚨 Segurança

### ⚠️ NUNCA faça isso:

❌ Compartilhar seu arquivo `.env`  
❌ Commitar o `.env` no Git  
❌ Usar o JWT_SECRET padrão em produção  
❌ Expor suas credenciais  

### ✅ Sempre faça isso:

✅ Mantenha o `.env` privado  
✅ Use `.env.example` como referência  
✅ Gere um JWT_SECRET único  
✅ Use senhas fortes  

---

## 📚 Mais Informações

Consulte os guias completos:
- **CONFIGURACAO_ENV.md** - Guia detalhado de cada variável
- **INSTALACAO_COMPLETA.md** - Instalação passo a passo

---

## 📱 Dúvidas?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

---

**Galaxy Gen's** - Desenvolvido por Lynx 👑

