# ⚙️ Guia de Configuração do .env

## 📋 Passos para Configurar

### 1️⃣ Copiar o arquivo de exemplo

No terminal, dentro da pasta `backend`:

```bash
cd backend
cp .env.example .env
```

**Ou manualmente:**
- Copie o arquivo `backend/.env.example`
- Renomeie a cópia para `backend/.env`

### 2️⃣ Configurar cada variável

Edite o arquivo `backend/.env` com suas configurações:

---

## 🔧 Variáveis de Ambiente

### PORT (Porta do Servidor)
```env
PORT=5000
```
- **O que é:** A porta em que o backend vai rodar
- **Padrão:** 5000
- **Quando mudar:** Se a porta 5000 já estiver em uso

---

### MONGODB_URI (Banco de Dados)

#### 🏠 Opção 1: MongoDB Local (Desenvolvimento)

```env
MONGODB_URI=mongodb://localhost:27017/galaxygens
```

**Pré-requisitos:**
1. Instalar MongoDB: https://www.mongodb.com/try/download/community
2. Iniciar o serviço:
   ```bash
   # Windows
   mongod
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### ☁️ Opção 2: MongoDB Atlas (Produção - Recomendado)

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/galaxygens?retryWrites=true&w=majority
```

**Como obter:**
1. Criar conta gratuita: https://www.mongodb.com/cloud/atlas/register
2. Criar um cluster (M0 Free)
3. Criar um usuário de banco:
   - Database Access → Add New Database User
   - Username: `galaxygens`
   - Password: (gere uma senha forte)
4. Permitir acesso:
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Conectar:
   - Databases → Connect → Connect your application
   - Copie a string de conexão
   - Substitua `<password>` pela senha do usuário
   - Substitua `myFirstDatabase` por `galaxygens`

**Exemplo real:**
```env
MONGODB_URI=mongodb+srv://galaxygens:Abc123456@cluster0.abc123.mongodb.net/galaxygens?retryWrites=true&w=majority
```

---

### JWT_SECRET (Segurança de Token)

```env
JWT_SECRET=sua_string_aleatoria_super_secreta_aqui
```

**O que é:** Chave secreta para assinar tokens JWT

**Como gerar uma boa:**

Opção 1 - Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Opção 2 - Online:
- https://randomkeygen.com/ (Fort Knox Passwords)

Opção 3 - PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**⚠️ IMPORTANTE:**
- Nunca compartilhe este valor
- Troque em produção
- Não use o valor padrão

---

### MERCADOPAGO_ACCESS_TOKEN (Pagamentos)

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-1234567890123456-010101-abc123def456-789012345
```

**Como obter:**

1. **Criar conta:** https://www.mercadopago.com.br/
2. **Acessar credenciais:** https://www.mercadopago.com.br/developers/panel/credentials
3. **Escolher o tipo:**
   - **Teste:** Para desenvolvimento (não cobra de verdade)
   - **Produção:** Para usar de verdade (cobra clientes)
4. **Copiar:** Access Token

**💡 Dica:** 
- Deixe como `seu_token_mercadopago_aqui` para usar modo de desenvolvimento
- O sistema terá um botão "Ativar (Teste)" que não requer pagamento real

---

### NODE_ENV (Ambiente)

```env
NODE_ENV=development
```

**Valores possíveis:**
- `development` - Desenvolvimento (logs completos, botão teste)
- `production` - Produção (otimizado, pagamentos reais)

---

### URLs (Opcional)

```env
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

**Quando configurar:**
- Em produção, com domínio real
- Para webhooks do Mercado Pago funcionarem

**Exemplo produção:**
```env
BACKEND_URL=https://api.galaxygens.com
FRONTEND_URL=https://galaxygens.com
```

---

## 📝 Exemplo Completo para Desenvolvimento

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

---

## 📝 Exemplo Completo para Produção

```env
PORT=5000
MONGODB_URI=mongodb+srv://galaxygens:SenhaForte123@cluster0.abc123.mongodb.net/galaxygens?retryWrites=true&w=majority
JWT_SECRET=5f8a9b3c2e7d1f4a6b8c9d2e5f7a8b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0
MERCADOPAGO_ACCESS_TOKEN=APP_USR-1234567890123456-010101-abc123def456-789012345
NODE_ENV=production
BACKEND_URL=https://api.galaxygens.com
FRONTEND_URL=https://galaxygens.com
```

---

## ✅ Checklist de Configuração

- [ ] Arquivo `.env` criado na pasta `backend/`
- [ ] MongoDB configurado e rodando
- [ ] JWT_SECRET gerado (string aleatória)
- [ ] Mercado Pago configurado (ou deixar padrão para teste)
- [ ] NODE_ENV definido
- [ ] Testar conexão com banco: `npm run dev`

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module 'dotenv'"
**Solução:**
```bash
cd backend
npm install
```

### Erro: "ECONNREFUSED 127.0.0.1:27017"
**Solução:** MongoDB não está rodando
```bash
mongod
```

### Erro: "Invalid connection string"
**Solução:** Verifique a MONGODB_URI
- Formato correto
- Senha correta
- IP permitido no Atlas

### Erro: "JsonWebTokenError"
**Solução:** JWT_SECRET não configurado ou inválido

---

## 🔒 Segurança

### ⚠️ NUNCA faça isso:

❌ Commitar o arquivo `.env` no Git
❌ Compartilhar suas credenciais
❌ Usar valores padrão em produção
❌ Expor o JWT_SECRET

### ✅ Sempre faça isso:

✅ Manter `.env` no `.gitignore`
✅ Usar `.env.example` para referência
✅ Gerar JWT_SECRET único
✅ Usar variáveis de ambiente no servidor

---

## 📱 Suporte

Dúvidas? Entre em contato:
**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

---

**Galaxy Gen's** © 2024-2025 - Desenvolvido por Lynx 👑

