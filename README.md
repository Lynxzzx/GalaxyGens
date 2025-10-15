# 🌌 Galaxy Gen's - Gerador de Contas Premium

![Galaxy Gen's Logo](frontend/public/logo.png)

Sistema completo de geração de contas desenvolvido por **Lynx**.

## 📱 Contato

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

## ✨ Características

- 🎮 Sistema de geração de contas com múltiplos serviços
- 👑 Painel administrativo completo (Owner/Admin)
- 🎫 Sistema de tickets para suporte
- 💎 Sistema de planos e pagamentos via Mercado Pago
- 🎁 Gift codes para distribuir tempo de acesso
- 📊 Dashboard com estatísticas e histórico
- 🔐 Autenticação JWT segura
- 💾 MongoDB para persistência de dados
- 🎨 Design moderno e responsivo

## 🚀 Tecnologias

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Mercado Pago SDK

### Frontend
- React 18
- React Router
- Axios
- React Toastify
- CSS3 com animações

## 📦 Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- MongoDB (local ou Atlas)
- Git

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd galaxy-gens
```

### 2. Instale as dependências
```bash
# Instalar todas as dependências (backend e frontend)
npm run install:all

# Ou instalar separadamente:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure o Backend

Edite o arquivo `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=seu_jwt_secret_super_secreto
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago
NODE_ENV=development
```

### 4. Crie o usuário Owner

```bash
cd backend
node scripts/createOwner.js
```

**Credenciais do Owner:**
- Usuário: `Lynx`
- Senha: `troca pela tua`

### 5. Inicie o sistema

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

O frontend estará disponível em: `http://localhost:3000`
O backend estará disponível em: `http://localhost:5000`

## 🎯 Funcionalidades por Cargo

### 👤 Usuário
- Gerar contas dos serviços disponíveis (com plano ativo)
- Visualizar histórico de contas geradas
- Resgatar gift codes
- Criar tickets de suporte
- Comprar planos

### 👮 Admin
- Tudo que o usuário tem
- Acesso ilimitado ao gerador (sem necessidade de plano)
- Gerenciar tickets (responder, resolver, fechar)
- Visualizar lista de usuários

### 👑 Owner (Lynx)
- Tudo que o admin tem
- **Gerenciar Usuários:**
  - Visualizar todos os usuários
  - Tornar usuários em admins
  - Adicionar dias de plano manualmente
  - Ativar/Desativar usuários
  - Deletar usuários
- **Gerenciar Serviços:**
  - Criar novos serviços
  - Editar serviços existentes
  - Adicionar contas ao estoque
  - Deletar serviços
- **Gerenciar Gift Codes:**
  - Criar gift codes
  - Visualizar códigos usados
  - Deletar códigos
- **Gerenciar Planos:**
  - Criar planos
  - Editar planos
  - Definir preços e duração
  - Deletar planos

## 📱 Rotas da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual

### Serviços
- `GET /api/services` - Listar serviços
- `POST /api/services` - Criar serviço (Owner)
- `POST /api/services/:id/generate` - Gerar conta
- `POST /api/services/:id/accounts` - Adicionar contas (Owner)

### Gift Codes
- `GET /api/giftcodes` - Listar códigos (Owner)
- `POST /api/giftcodes` - Criar código (Owner)
- `POST /api/giftcodes/redeem` - Resgatar código

### Tickets
- `GET /api/tickets` - Listar tickets
- `POST /api/tickets` - Criar ticket
- `POST /api/tickets/:id/messages` - Adicionar mensagem
- `PUT /api/tickets/:id/status` - Atualizar status (Admin)

### Usuários
- `GET /api/users` - Listar usuários (Owner)
- `PUT /api/users/:id/role` - Atualizar cargo (Owner)
- `PUT /api/users/:id/plan` - Adicionar dias (Owner)

### Planos
- `GET /api/plans` - Listar planos
- `POST /api/plans` - Criar plano (Owner)
- `PUT /api/plans/:id` - Atualizar plano (Owner)

### Pagamentos
- `POST /api/payments/create-preference` - Criar pagamento
- `POST /api/payments/webhook` - Webhook Mercado Pago
- `POST /api/payments/verify` - Ativar plano (modo dev)

## 🎨 Personalização

### Logo
Substitua os arquivos em `frontend/public/`:
- `logo.png` - Logo principal (512x512px recomendado)
- `favicon.ico` - Ícone da aba
- `logo192.png` - Logo para PWA (192x192px)
- `logo512.png` - Logo para PWA (512x512px)

### Cores
Edite as cores no `frontend/src/index.css` e `frontend/src/App.css`:
- Primária: `#6366f1`
- Secundária: `#8b5cf6`
- Fundo: `#0f172a`, `#1e293b`

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT
- Proteção de rotas por cargo
- Validação de dados
- Variáveis de ambiente

## 📝 Notas Importantes

1. **MongoDB**: Certifique-se de que o MongoDB está rodando antes de iniciar o backend
2. **Mercado Pago**: Configure o token para pagamentos reais. Em desenvolvimento, use o botão de teste
3. **CORS**: Configurado para aceitar requisições do frontend
4. **Port**: Backend na porta 5000, Frontend na porta 3000

## 🐛 Solução de Problemas

### MongoDB não conecta
```bash
# Verifique se o MongoDB está rodando
mongod --version

# Inicie o MongoDB
mongod
```

### Erro de CORS
- Verifique se o backend está rodando
- Confirme as URLs no arquivo `.env`

### Erro ao instalar dependências
```bash
# Limpe o cache do npm
npm cache clean --force

# Reinstale
npm install
```

## 📄 Licença

Desenvolvido por **Lynx** - © 2024-2025 Galaxy Gen's

## 🤝 Suporte

Para suporte e dúvidas:
- Telegram: [t.me/lynxdevz](https://t.me/lynxdevz)

---

**Galaxy Gen's** - A melhor solução para geração de contas premium 🌟



# naoseiaa
