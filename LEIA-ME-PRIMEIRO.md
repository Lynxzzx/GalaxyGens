# 🚨 ERRO AO FAZER LOGIN? LEIA AQUI!

## ⚡ Solução em 3 Passos

### 1️⃣ Execute este comando:
```cmd
CONFIGURAR_TUDO.bat
```
**O que faz:** Cria os arquivos `.env`, instala dependências e cria o usuário Owner.

---

### 2️⃣ Inicie o MongoDB:

**Abra um NOVO terminal** e execute:
```cmd
mongod
```

**IMPORTANTE:** Deixe este terminal aberto! Minimize, mas não feche.

**Não tem MongoDB?**
- Instale: https://www.mongodb.com/try/download/community
- Ou use nuvem (grátis): https://www.mongodb.com/cloud/atlas/register

---

### 3️⃣ Inicie o sistema:

**Abra outro NOVO terminal** e execute:
```cmd
npm run dev
```

Aguarde abrir no navegador: http://localhost:3000

---

## 🔐 Fazer Login

- **Usuário:** `Lynx`
- **Senha:** `eliezermito1`

---

## ✅ Deve Funcionar!

Se funcionou, você verá a mensagem **"Bem-vindo, Lynx!"** e será redirecionado ao Dashboard.

---

## ❌ Ainda deu erro?

### Execute o diagnóstico:
```cmd
DIAGNOSTICO.bat
```

Isso verificará o que está faltando.

---

### Erros comuns:

**"Backend não está respondendo"**
→ Execute em um terminal: `cd backend` e depois `npm run dev`

**"ECONNREFUSED"**
→ MongoDB não está rodando. Execute: `mongod`

**"Cannot find module"**
→ Dependências não instaladas. Execute: `npm run install:all`

**"Credenciais inválidas"**
→ Owner não foi criado. Execute: `cd backend` e `node scripts/createOwner.js`

---

## 🔍 Ver o erro exato

1. Pressione **F12** no navegador
2. Clique na aba **Console**
3. Tente fazer login
4. Veja o erro (em vermelho)
5. Me envie no Telegram: t.me/lynxdevz

---

## 📺 Tutorial Passo a Passo

Siga exatamente nesta ordem:

**Terminal 1:**
```cmd
CONFIGURAR_TUDO.bat
```
(Aguarde finalizar - pode demorar alguns minutos)

**Terminal 2:**
```cmd
mongod
```
(Deixe aberto - aparecerá várias linhas de texto)

**Terminal 3:**
```cmd
npm run dev
```
(Aguarde o navegador abrir automaticamente)

**Navegador:**
- Acesse: http://localhost:3000
- Usuário: `Lynx`
- Senha: `eliezermito1`
- Clique em **Entrar**

---

## 💡 Dica

Se quiser testar se o backend está respondendo:
```cmd
TESTAR_BACKEND.bat
```

---

## 📱 Precisa de ajuda?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

Envie:
- Print do erro no navegador (F12 → Console)
- Print do terminal
- Resultado do `DIAGNOSTICO.bat`

---

**Galaxy Gen's** - Desenvolvido por Lynx 👑

© 2024-2025



