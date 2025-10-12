# 🚀 Guia de Instalação Completa - Galaxy Gen's

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Básica](#instalação-básica)
3. [Configuração do MongoDB](#configuração-do-mongodb)
4. [Configuração do .env](#configuração-do-env)
5. [Primeiro Uso](#primeiro-uso)
6. [Deploy em Produção](#deploy-em-produção)

---

## 🔧 Pré-requisitos

### Instalar Node.js

**Windows/Mac:**
1. Baixe: https://nodejs.org/ (versão LTS)
2. Execute o instalador
3. Verifique:
   ```bash
   node --version
   npm --version
   ```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Instalar MongoDB

**Windows:**
1. Baixe: https://www.mongodb.com/try/download/community
2. Execute o instalador
3. Marque "Install MongoDB as a Service"
4. Verifique:
   ```bash
   mongod --version
   ```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Instalar Git (Opcional)

**Windows:** https://git-scm.com/download/win  
**Mac:** `brew install git`  
**Linux:** `sudo apt-get install git`

---

## 📦 Instalação Básica

### 1. Baixar o Projeto

**Com Git:**
```bash
git clone [URL-DO-REPOSITORIO]
cd galaxy-gens
```

**Sem Git:**
- Baixe o ZIP do projeto
- Extraia para uma pasta
- Abra o terminal na pasta

### 2. Instalar Dependências

```bash
npm run install:all
```

Isso instalará:
- ✅ Dependências do root
- ✅ Dependências do backend
- ✅ Dependências do frontend

---

## 🗄️ Configuração do MongoDB

### Opção 1: MongoDB Local (Recomendado para Desenvolvimento)

**1. Iniciar o MongoDB:**

Windows:
```bash
mongod
```

Mac:
```bash
brew services start mongodb-community
```

Linux:
```bash
sudo systemctl start mongod
```

**2. Verificar se está rodando:**
```bash
mongosh
# Se conectar, está funcionando!
# Digite: exit
```

**3. No .env:**
```env
MONGODB_URI=mongodb://localhost:27017/galaxygens
```

### Opção 2: MongoDB Atlas (Recomendado para Produção)

**1. Criar conta gratuita:**
- Acesse: https://www.mongodb.com/cloud/atlas/register
- Faça o cadastro

**2. Criar cluster:**
- Clique em "Build a Database"
- Escolha "M0 Free"
- Escolha a região mais próxima (ex: São Paulo)
- Clique em "Create Cluster"

**3. Criar usuário do banco:**
- Vá em "Database Access"
- Clique em "Add New Database User"
- Username: `galaxygens`
- Password: Clique em "Autogenerate Secure Password" e copie
- Database User Privileges: "Read and write to any database"
- Clique em "Add User"

**4. Permitir conexões:**
- Vá em "Network Access"
- Clique em "Add IP Address"
- Clique em "Allow Access from Anywhere" (0.0.0.0/0)
- Clique em "Confirm"

**5. Obter string de conexão:**
- Vá em "Databases"
- Clique em "Connect" no seu cluster
- Escolha "Connect your application"
- Copie a connection string
- Substitua `<password>` pela senha que você copiou
- Substitua `myFirstDatabase` por `galaxygens`

**6. No .env:**
```env
MONGODB_URI=mongodb+srv://galaxygens:SUA_SENHA_AQUI@cluster0.abc123.mongodb.net/galaxygens?retryWrites=true&w=majority
```

---

## ⚙️ Configuração do .env

### 1. Criar o arquivo

```bash
cd backend
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**Ou manualmente:**
- Copie o arquivo `.env.example`
- Cole na mesma pasta
- Renomeie para `.env`

### 2. Editar o arquivo

Abra `backend/.env` em um editor de texto e configure:

```env
# Porta do servidor (deixe 5000)
PORT=5000

# MongoDB (escolha uma opção acima)
MONGODB_URI=mongodb://localhost:27017/galaxygens

# JWT Secret (gere um único)
JWT_SECRET=GERE_UMA_STRING_ALEATORIA_AQUI

# Mercado Pago (opcional para testes)
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui

# Ambiente
NODE_ENV=development
```

### 3. Gerar JWT Secret

Execute no terminal:

**Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Mac/Linux:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie o resultado e cole no JWT_SECRET.

---

## 👑 Primeiro Uso

### 1. Criar usuário Owner

```bash
cd backend
node scripts/createOwner.js
cd ..
```

Você verá:
```
✅ Owner criado com sucesso!
Usuário: Lynx
Senha: eliezermito1
Role: owner
```

### 2. Iniciar o sistema

**Windows:**
```bash
START.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Ou manualmente:**
```bash
npm run dev
```

### 3. Acessar

Abra o navegador em:
```
http://localhost:3000
```

**Faça login:**
- Usuário: `Lynx`
- Senha: `eliezermito1`

### 4. Primeiros passos

**a) Criar um serviço:**
1. Vá para "Admin" → "Serviços"
2. Clique em "➕ Novo Serviço"
3. Preencha:
   - Nome: Netflix
   - Descrição: Streaming de filmes
   - Ícone: 🎬
4. Clique em "Criar"
5. Adicione contas no formato:
   ```
   email1@teste.com:senha123
   email2@teste.com:senha456
   ```

**b) Criar um plano:**
1. Vá para "Admin" → "Planos"
2. Clique em "➕ Novo Plano"
3. Preencha:
   - Nome: Mensal
   - Descrição: Acesso mensal
   - Duração: 30 dias
   - Preço: 19.90
4. Clique em "Criar"

**c) Criar um gift code:**
1. Vá para "Admin" → "Gift Codes"
2. Clique em "➕ Novo Gift Code"
3. Preencha:
   - Código: TESTE7
   - Duração: 7 dias
4. Clique em "Criar"

**d) Testar como usuário:**
1. Faça logout
2. Registre nova conta
3. Vá para "Dashboard"
4. Resgate o código: TESTE7
5. Vá para "Gerador"
6. Gere uma conta!

---

## 🌐 Deploy em Produção

### Preparação

**1. Atualizar .env:**
```env
NODE_ENV=production
MONGODB_URI=sua_string_do_atlas
JWT_SECRET=string_super_secreta_gerada
MERCADOPAGO_ACCESS_TOKEN=token_de_producao
BACKEND_URL=https://api.seudominio.com
FRONTEND_URL=https://seudominio.com
```

**2. Build do frontend:**
```bash
cd frontend
npm run build
cd ..
```

### Opções de Deploy

#### Opção 1: Vercel (Frontend) + Heroku (Backend)

**Frontend (Vercel):**
1. Instale Vercel CLI: `npm i -g vercel`
2. Na pasta frontend: `vercel`
3. Siga as instruções

**Backend (Heroku):**
1. Crie conta: https://heroku.com
2. Instale Heroku CLI
3. Na pasta backend:
   ```bash
   heroku create galaxygens-api
   heroku config:set MONGODB_URI="sua_string"
   heroku config:set JWT_SECRET="seu_secret"
   git push heroku main
   ```

#### Opção 2: VPS (DigitalOcean, Vultr, etc)

**1. Conectar no servidor:**
```bash
ssh usuario@seu-ip
```

**2. Instalar dependências:**
```bash
sudo apt update
sudo apt install -y nodejs npm nginx
```

**3. Clonar projeto:**
```bash
git clone [url-do-projeto]
cd galaxy-gens
npm run install:all
```

**4. Configurar .env**

**5. Usar PM2:**
```bash
npm i -g pm2
cd backend
pm2 start server.js --name galaxygens-api
cd ../frontend
pm2 start npm --name galaxygens-web -- start
pm2 startup
pm2 save
```

**6. Configurar Nginx** (serve o build do React e faz proxy para API)

---

## 🐛 Solução de Problemas

### MongoDB não conecta
```bash
# Verificar se está rodando
mongosh

# Se não funcionar, iniciar:
mongod
```

### Porta em uso
```bash
# Ver o que está usando a porta
netstat -ano | findstr :5000

# Matar o processo
taskkill /PID [numero] /F
```

### Erro ao instalar dependências
```bash
# Limpar cache
npm cache clean --force

# Reinstalar
npm run install:all
```

### Owner não foi criado
```bash
cd backend
node scripts/createOwner.js
```

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] MongoDB instalado e rodando
- [ ] Dependências instaladas (`npm run install:all`)
- [ ] Arquivo `.env` configurado
- [ ] Owner criado
- [ ] Sistema iniciado (`npm run dev`)
- [ ] Acessou http://localhost:3000
- [ ] Fez login como Owner
- [ ] Criou um serviço de teste
- [ ] Criou um plano
- [ ] Criou um gift code
- [ ] Testou como usuário

---

## 📱 Suporte

Problemas? Entre em contato:

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

---

**Galaxy Gen's** © 2024-2025 - Desenvolvido por Lynx 👑



