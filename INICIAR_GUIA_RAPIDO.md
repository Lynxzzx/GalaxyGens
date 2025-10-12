# ⚡ Guia de Início Rápido - Galaxy Gen's

## ✅ Tudo Pronto! Sistema 100% Funcional

---

## 🚀 Iniciar o Sistema (1 Comando)

```
INICIAR_SIMPLES.bat
```

Isso irá:
- ✅ Verificar e iniciar o MongoDB
- ✅ Iniciar o Backend na porta 5000
- ✅ Iniciar o Frontend na porta 3000

---

## 🔐 Fazer Login

1. Acesse: **http://localhost:3000**
2. Faça login com:
   - **Usuário:** `Lynx`
   - **Senha:** `eliezermito1`
   - **Cargo:** Owner (Acesso Total)

---

## 📊 Configurações Atuais

### MongoDB:
- **Tipo:** MongoDB Atlas (Nuvem) ☁️
- **Database:** `galaxygens`
- **Status:** ✅ Conectado

### Backend:
- **URL:** http://localhost:5000
- **MongoDB:** MongoDB Atlas
- **Mercado Pago:** ✅ Token configurado

### Frontend:
- **URL:** http://localhost:3000
- **Status:** ✅ Funcionando

---

## 👑 Como Owner, Você Pode:

### 1️⃣ Adicionar Serviços
- Vá em **"Gerenciar Serviços"**
- Clique em **"Adicionar Serviço"**
- Preencha nome, descrição, faça upload do ícone
- Adicione contas ao estoque

### 2️⃣ Criar Planos
- Vá em **"Gerenciar Planos"**
- Clique em **"Criar Plano"**
- Defina nome, descrição, preço e duração
- Ative o plano

### 3️⃣ Gerar Gift Codes
- Vá em **"Gift Codes"**
- Clique em **"Criar Código"**
- Defina quantos dias de acesso o código dará
- Compartilhe o código com usuários

### 4️⃣ Gerenciar Usuários
- Vá em **"Gerenciar Usuários"**
- Promova usuários para Admin
- Adicione dias de plano manualmente
- Ative/Desative contas
- Delete usuários

### 5️⃣ Responder Tickets
- Vá em **"Tickets"**
- Veja todos os tickets dos usuários
- Responda e resolva tickets

---

## 🔧 Comandos Úteis

### Recriar o Usuário Owner:
```
CRIAR_OWNER.bat
```

### Testar Conexão MongoDB:
```
cd backend
node scripts/testConnection.js
```

### Ver Logs do Backend:
```
cd backend
npm run dev
```

---

## 🛠️ Problemas Resolvidos

### ✅ MongoDB não encontrado
- **Solução:** Execute `INSTALAR_MONGODB.bat`

### ✅ MongoDB Atlas não conecta
- **Solução:** URI corrigida com o nome do database
- **Formato:** `mongodb+srv://usuario:senha@cluster.mongodb.net/galaxygens`

### ✅ Erro "mercadopago.configure is not a function"
- **Solução:** Código atualizado para Mercado Pago SDK v2.x
- **Detalhes:** Veja `CORRECAO_MERCADOPAGO.md`

### ✅ Usuário Owner não existe
- **Solução:** Execute `CRIAR_OWNER.bat` ou `cd backend && node scripts/createOwner.js`

---

## 📝 Estrutura de Pastas

```
galaxy-gens/
├── backend/
│   ├── config/          # Configurações (DB)
│   ├── middleware/      # Autenticação
│   ├── models/          # Modelos (User, Service, etc)
│   ├── routes/          # Rotas da API
│   ├── scripts/         # Scripts utilitários
│   ├── .env            # ⚙️ Variáveis de ambiente
│   └── server.js        # Servidor principal
├── frontend/
│   ├── public/          # Arquivos estáticos
│   ├── src/            # Código React
│   └── package.json
├── INICIAR_SIMPLES.bat              # 🚀 Iniciar tudo
├── CRIAR_OWNER.bat                  # 👑 Criar usuário Owner
├── INSTALAR_MONGODB.bat             # 📦 Instalar MongoDB
├── MONGODB_GUIA_INSTALACAO.md       # 📚 Guia MongoDB
├── CORRECAO_MERCADOPAGO.md          # 🛠️ Correções MP
├── CONFIGURACAO_COMPLETA.md         # 📖 Doc completa
└── INICIAR_GUIA_RAPIDO.md           # ⚡ Este arquivo
```

---

## 🎯 Fluxo de Uso Típico

### Para o Owner (Você):
1. Inicie o sistema → `INICIAR_SIMPLES.bat`
2. Faça login como Lynx
3. Adicione serviços e contas
4. Crie planos
5. Crie gift codes (opcional)
6. Gerencie usuários conforme necessário

### Para Usuários Normais:
1. Registram uma conta
2. Fazem login
3. Resgatam um gift code OU compram um plano
4. Geram contas dos serviços disponíveis
5. Visualizam histórico

### Para Admins:
1. Promovidos pelo Owner
2. Geram contas ilimitadamente (sem plano)
3. Respondem tickets
4. Visualizam usuários

---

## 💡 Dicas Importantes

### 1. Backup do Database
Como você está usando MongoDB Atlas, os dados já têm backup automático na nuvem! ☁️

### 2. Modo de Desenvolvimento
O sistema está em modo de desenvolvimento (`NODE_ENV=development`):
- Existe endpoint `/api/payments/verify` para ativar planos sem pagamento real
- Útil para testes

### 3. Pagamentos Reais
Para aceitar pagamentos reais:
- O token do Mercado Pago já está configurado! ✅
- Configure as URLs de webhook no painel do Mercado Pago
- Teste primeiro com o ambiente de teste

### 4. Adicionar Novos Admins
Como Owner, você pode promover qualquer usuário para Admin:
- Vá em "Gerenciar Usuários"
- Clique em um usuário
- Clique em "Tornar Admin"

---

## 📱 Suporte

**Desenvolvedor:** Lynx  
**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

---

## 🌟 Próximos Passos

1. ✅ ~~Instalar MongoDB~~ → Feito!
2. ✅ ~~Criar usuário Owner~~ → Feito!
3. ✅ ~~Corrigir erro do Mercado Pago~~ → Feito!
4. ⏭️ **Adicionar seus serviços**
5. ⏭️ **Criar planos**
6. ⏭️ **Divulgar o sistema**

---

**Galaxy Gen's** - Sistema completo de geração de contas premium  
Desenvolvido por **Lynx** © 2024-2025 🌌

**Tudo está funcionando perfeitamente! Boa sorte com seu sistema! 🚀**


