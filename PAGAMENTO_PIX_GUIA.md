# 💳 Sistema de Pagamento PIX - Galaxy Gen's

## ✅ Implementação Completa!

O sistema agora aceita pagamentos via **PIX** com:
- ✅ QR Code para escanear
- ✅ Código Pix Copia e Cola
- ✅ Aprovação instantânea
- ✅ Ativação automática do plano

---

## 🔑 Configuração do Mercado Pago

### 1. Obtenha suas Credenciais

Acesse: https://www.mercadopago.com.br/developers/panel

1. **Faça login** na sua conta Mercado Pago
2. **Vá em "Credenciais"**
3. **Escolha o ambiente:**
   - **Teste** (sandbox): Para testes
   - **Produção**: Para pagamentos reais

### 2. Copie as Credenciais

Você precisa de **duas chaves**:

#### Access Token (Privada):
```
APP_USR-4992066722862761-071917-cac4d45c5b7beb291e59c31cde0bcfcf-353709502
```

#### Public Key (Pública):
```
APP_USR-25e1d90d-5d00-41db-b079-e235ccec16ef
```

### 3. Configure no .env

Edite `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
MERCADOPAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI
MERCADOPAGO_PUBLIC_KEY=SUA_PUBLIC_KEY_AQUI
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

---

## 🎯 Como Funciona

### 1. Usuário Escolhe um Plano
- Acessa a página de planos
- Clica em "Comprar Agora"

### 2. Sistema Gera o PIX
```
Backend → Mercado Pago API → Retorna:
- QR Code (imagem base64)
- Código Pix Copia e Cola
- ID do pagamento
- Validade (30 minutos)
```

### 3. Usuário Paga
- **Opção 1:** Escaneia o QR Code com o app do banco
- **Opção 2:** Copia o código e cola no app do banco

### 4. Confirmação Automática
```
Mercado Pago → Webhook → Backend:
- Verifica pagamento aprovado
- Ativa o plano do usuário
- Adiciona dias de acesso
```

---

## 📡 Webhook (Notificações)

### Configurar no Mercado Pago

1. **Acesse:** https://www.mercadopago.com.br/developers/panel/notifications/webhooks
2. **URL do Webhook:**
   ```
   https://seu-dominio.com/api/payments/webhook
   ```
   Ou para teste local com ngrok:
   ```
   https://seu-id.ngrok.io/api/payments/webhook
   ```

3. **Eventos a Monitorar:**
   - [x] `payment` (Pagamento)
   - [x] `merchant_order` (Ordem) - opcional

### Testar Webhook Localmente

Use o **ngrok** para expor localhost:

```bash
# Instalar ngrok
# Download em: https://ngrok.com/download

# Expor porta 5000
ngrok http 5000

# Copie a URL gerada, exemplo:
# https://abc123.ngrok.io

# Configure no Mercado Pago:
# https://abc123.ngrok.io/api/payments/webhook
```

---

## 🧪 Testando o Sistema

### 1. Teste Rápido do Mercado Pago

```bash
cd backend
node scripts/testMercadoPago.js
```

Resultado esperado:
```
✅ Token encontrado
✅ Cliente criado
✅ Preferência criada com sucesso!
```

### 2. Teste Completo de Pagamento

1. **Inicie o sistema:**
   ```
   INICIAR_SIMPLES.bat
   ```

2. **Faça login como Owner (Lynx)**

3. **Crie um plano de teste:**
   - Vá em Admin → Gerenciar Planos
   - Nome: "Plano Teste"
   - Preço: R$ 0,01
   - Duração: 7 dias

4. **Teste o pagamento:**
   - Vá em Planos
   - Clique em "Comprar Agora"
   - Veja o QR Code e código PIX

### 3. Ambiente de Teste (Sandbox)

O Mercado Pago oferece um ambiente de teste:

1. **Use credenciais de TESTE**
2. **Usuários de teste:**
   - Crie em: https://www.mercadopago.com.br/developers/panel/test-users

3. **Cartões de teste:**
   - Aprovado: `APRO`
   - Rejeitado: `OTHE`

---

## 🔄 Fluxo de Pagamento PIX

```
┌─────────────┐
│   Usuário   │
└──────┬──────┘
       │ Clica em "Comprar"
       v
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ POST /api/payments/create-preference
       v
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │ Cria pagamento PIX
       v
┌─────────────┐
│  Mercado    │
│   Pago API  │
└──────┬──────┘
       │ Retorna QR Code + Código
       v
┌─────────────┐
│  Frontend   │
│ (Tela PIX)  │
└──────┬──────┘
       │ Usuário paga
       v
┌─────────────┐
│ App Banco   │
└──────┬──────┘
       │ Confirma pagamento
       v
┌─────────────┐
│  Mercado    │
│   Pago      │
└──────┬──────┘
       │ Envia webhook
       v
┌─────────────┐
│   Backend   │
│  (Webhook)  │
└──────┬──────┘
       │ Ativa plano
       v
┌─────────────┐
│  Database   │
│  (MongoDB)  │
└─────────────┘
```

---

## 📝 Estrutura do Código

### Backend

#### `backend/routes/payments.js`
```javascript
// Criar pagamento PIX
POST /api/payments/create-preference
→ Recebe: { planId }
→ Retorna: { qr_code, qr_code_text, id }

// Webhook do Mercado Pago
POST /api/payments/webhook
→ Recebe notificações de pagamento
→ Ativa plano automaticamente
```

### Frontend

#### `frontend/src/pages/Plans.js`
- Lista planos disponíveis
- Botão "Comprar Agora"
- Chama API e redireciona para PIX

#### `frontend/src/pages/PixPayment.js`
- Exibe QR Code
- Exibe código Pix Copia e Cola
- Botão para copiar código
- Instruções de pagamento

---

## 🎨 Interface do Usuário

### Página de PIX

A página mostra:

1. **QR Code Grande** (250x250px)
2. **Código Pix Copia e Cola** (com botão copiar)
3. **Informações:**
   - ⏱️ Válido por 30 minutos
   - 💰 Aprovação instantânea
   - ✅ Plano ativado automaticamente

4. **Instruções passo a passo**
5. **Botões:**
   - Voltar aos Planos
   - Ir para Dashboard

---

## 🔒 Segurança

### Validações Implementadas:

✅ **Backend:**
- Token JWT obrigatório
- Validação do plano (existe e está ativo)
- Verificação de webhook com dados do Mercado Pago
- External reference com dados criptografados

✅ **Frontend:**
- Autenticação obrigatória
- State com dados do PIX (não pode ser alterado)
- Validação de sessão

---

## 💡 Dicas Importantes

### 1. Credenciais

⚠️ **NUNCA** exponha suas credenciais!
- Access Token é **privada** (apenas backend)
- Public Key pode ser exposta (frontend)

### 2. Ambiente de Produção

Para produção, use:
- Credenciais de PRODUÇÃO (não teste)
- HTTPS obrigatório
- Domínio real (não localhost)

### 3. Webhook

O webhook **DEVE** ser acessível:
- URL pública (não localhost)
- HTTPS em produção
- Porta 80 ou 443

### 4. Timeout

Pagamentos PIX expiram em:
- **30 minutos** por padrão
- Após expirar, novo pagamento deve ser criado

---

## 🐛 Solução de Problemas

### QR Code não aparece

**Causa:** Token inválido ou problema na API

**Solução:**
```bash
# Teste o token
cd backend
node scripts/testMercadoPago.js

# Verifique os logs
npm run dev
```

### Pagamento não ativa o plano

**Causa:** Webhook não está funcionando

**Solução:**
1. Use ngrok para teste local
2. Configure URL no Mercado Pago
3. Verifique logs do backend

### Erro "Mercado Pago não configurado"

**Causa:** Token não está no .env

**Solução:**
```bash
# Verifique o .env
cd backend
cat .env

# Deve ter:
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...
```

---

## 📊 Monitoramento

### Ver Pagamentos

No painel do Mercado Pago:
https://www.mercadopago.com.br/activities

### Logs do Backend

```bash
cd backend
npm run dev

# Você verá:
💳 Criando pagamento PIX para plano: ...
✅ Pagamento PIX criado com sucesso!
```

### Verificar Webhook

```bash
# No terminal do backend, quando um pagamento for aprovado:
🔔 Webhook recebido: payment
✅ Pagamento aprovado!
✅ Plano ativado para usuário: ...
```

---

## 🌐 Deploy em Produção

### 1. Configure o domínio

```env
FRONTEND_URL=https://seusite.com
BACKEND_URL=https://api.seusite.com
```

### 2. Configure o Webhook

```
https://api.seusite.com/api/payments/webhook
```

### 3. Use credenciais de produção

### 4. Teste tudo antes de divulgar!

---

## ✅ Checklist Final

Antes de ir para produção:

```
[ ] Credenciais de produção configuradas
[ ] Webhook configurado e testado
[ ] Pagamento PIX testado com valor real
[ ] Ativação automática funcionando
[ ] HTTPS configurado
[ ] Domínio real (não localhost)
[ ] Logs de erro configurados
[ ] Backup do database
[ ] Planos criados e ativos
```

---

## 📱 Suporte

**Desenvolvedor:** Lynx  
**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

**Mercado Pago:**  
**Suporte:** https://www.mercadopago.com.br/developers/pt/support

---

**Galaxy Gen's** - Sistema completo com pagamento PIX! 💳🎉


