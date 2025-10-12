# 🇧🇷 Instruções de Uso - Galaxy Gen's

## 🚀 Como Iniciar o Projeto

### 1️⃣ Primeira Vez

```bash
# 1. Instale todas as dependências
npm run install:all

# 2. Configure o MongoDB
# Certifique-se de que o MongoDB está instalado e rodando
mongod

# 3. Crie o usuário Owner
cd backend
node scripts/createOwner.js
cd ..
```

### 2️⃣ Iniciar o Sistema

**Opção 1 - Dois terminais separados:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

**Opção 2 - Um único comando (na raiz):**

```bash
npm run dev
```

### 3️⃣ Acessar o Sistema

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 👤 Login Inicial

Use as credenciais do Owner para primeiro acesso:

- **Usuário:** Lynx
- **Senha:** eliezermito1

## 📋 Guia de Uso por Funcionalidade

### 🎮 Como Adicionar Serviços (Owner)

1. Faça login como Owner
2. Vá para **Admin** → **Serviços**
3. Clique em **➕ Novo Serviço**
4. Preencha:
   - Nome (ex: "Netflix")
   - Descrição (ex: "Streaming de filmes e séries")
   - Ícone (emoji, ex: 🎬)
5. Clique em **Criar**
6. No card do serviço, adicione contas no formato:
   ```
   email1@example.com:senha123
   email2@example.com:senha456
   ```
7. Clique em **➕ Adicionar Contas**

### 💎 Como Criar Planos (Owner)

1. Vá para **Admin** → **Planos**
2. Clique em **➕ Novo Plano**
3. Preencha:
   - Nome (ex: "Mensal")
   - Descrição (ex: "Acesso mensal completo")
   - Duração (ex: 30 dias)
   - Preço (ex: 19.90)
   - Recursos (um por linha):
     ```
     Acesso ilimitado
     Suporte prioritário
     Contas premium
     ```
4. Clique em **Criar**

### 🎁 Como Criar Gift Codes (Owner)

1. Vá para **Admin** → **Gift Codes**
2. Clique em **➕ Novo Gift Code**
3. Preencha:
   - Código (ex: "PROMO2024")
   - Duração em dias (ex: 7)
4. Clique em **Criar**
5. Compartilhe o código com usuários

### 👥 Como Gerenciar Usuários (Owner)

1. Vá para **Admin** → **Usuários**
2. Você pode:
   - **Tornar Admin:** Promover usuários a administradores
   - **+ Dias:** Adicionar tempo de plano manualmente
   - **Ativar/Desativar:** Bloquear ou desbloquear contas
   - **🗑️ Deletar:** Remover usuários (exceto Owner)

### 🎫 Como Gerenciar Tickets (Admin/Owner)

1. Vá para **Tickets**
2. Clique em um ticket para ver detalhes
3. Como Admin/Owner:
   - Responda as mensagens dos usuários
   - Altere o status (Aberto → Em Progresso → Resolvido → Fechado)
   - Atribua tickets a outros admins

### ⚡ Como Gerar Contas (Usuários com Plano)

1. Vá para **Gerador**
2. Escolha um serviço
3. Clique em **⚡ Gerar Conta**
4. A conta será exibida - clique em **📋 Copiar**
5. Veja o histórico no **Dashboard**

## 🔧 Configurações Importantes

### Mercado Pago (Pagamentos)

1. Crie uma conta no [Mercado Pago](https://www.mercadopago.com.br/developers)
2. Obtenha seu **Access Token**
3. Edite `backend/.env`:
   ```env
   MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
   ```
4. Em desenvolvimento, use o botão **🧪 Ativar (Teste)** nos planos

### MongoDB

**Local:**
```bash
# Instalar no Windows/Mac/Linux
# Seguir: https://www.mongodb.com/try/download/community

# Iniciar serviço
mongod
```

**MongoDB Atlas (Cloud - Grátis):**
1. Crie conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Obtenha a connection string
4. Edite `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/galaxygens
   ```

### Customizar Cores/Design

Edite os arquivos CSS em `frontend/src/`:
- `index.css` - Estilos globais
- `App.css` - Estilos do app
- Cada página tem seu próprio CSS

Cores principais:
- Primária: `#6366f1` (azul)
- Secundária: `#8b5cf6` (roxo)
- Owner/Admin: `#f59e0b` (laranja)

## 🐛 Problemas Comuns

### "ECONNREFUSED" ao iniciar

**Problema:** MongoDB não está rodando

**Solução:**
```bash
# Inicie o MongoDB
mongod
```

### "Port already in use"

**Problema:** Porta 5000 ou 3000 já está em uso

**Solução:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [número] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Mercado Pago não funciona

**Problema:** Token não configurado

**Solução:**
- Use o botão "Ativar (Teste)" em desenvolvimento
- Configure o token real para produção

### "Network Error" no frontend

**Problema:** Backend não está rodando

**Solução:**
```bash
cd backend
npm run dev
```

## 📱 Contato e Suporte

**Desenvolvedor:** Lynx  
**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

## 📊 Estrutura de Pastas

```
galaxy-gens/
├── backend/
│   ├── config/          # Configuração do banco
│   ├── middleware/      # Autenticação
│   ├── models/          # Models do MongoDB
│   ├── routes/          # Rotas da API
│   ├── scripts/         # Scripts auxiliares
│   ├── .env             # Variáveis de ambiente
│   ├── server.js        # Servidor principal
│   └── package.json
│
├── frontend/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── context/     # Context API (Auth)
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── App.js       # Componente principal
│   │   └── index.js     # Entry point
│   └── package.json
│
├── README.md            # Documentação completa
├── INSTRUCOES_PT.md     # Este arquivo
└── package.json         # Scripts raiz
```

## ✅ Checklist de Deploy

Antes de colocar em produção:

- [ ] Trocar JWT_SECRET por um valor seguro
- [ ] Configurar MongoDB Atlas (não usar local)
- [ ] Configurar token real do Mercado Pago
- [ ] Trocar NODE_ENV para "production"
- [ ] Configurar domínio e HTTPS
- [ ] Fazer backup do banco de dados
- [ ] Testar todos os fluxos
- [ ] Configurar variáveis de ambiente no servidor

## 🎓 Dicas de Uso

1. **Sempre faça backup** do MongoDB regularmente
2. **Teste os gift codes** antes de distribuir
3. **Monitore o estoque** de contas dos serviços
4. **Responda tickets** rapidamente para satisfação dos usuários
5. **Adicione planos variados** para diferentes públicos
6. **Use emojis nos serviços** para melhor visual

---

**Galaxy Gen's** © 2024-2025 - Desenvolvido por Lynx 👑



