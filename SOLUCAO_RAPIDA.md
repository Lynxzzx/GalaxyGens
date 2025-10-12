# ⚡ Script Fecha Rápido? SOLUÇÃO AQUI!

## 🔴 PROBLEMA: O script abre e fecha muito rápido

Isso acontece porque está dando erro. Vamos descobrir qual!

---

## ✅ SOLUÇÃO (Execute em Ordem):

### 1️⃣ Descubra o erro

**Clique duas vezes em:**
```
VERIFICAR_ERRO.bat
```

Este script vai:
- ✅ Verificar TUDO que pode estar errado
- ✅ Mostrar exatamente qual é o problema
- ✅ Dar a solução para cada erro
- ✅ NÃO vai fechar sozinho

**Leia os erros que aparecer!**

---

### 2️⃣ Use o script simples

**Clique duas vezes em:**
```
INICIAR_SIMPLES.bat
```

Este é mais simples e mostra os erros.

---

## 🔍 Erros Comuns e Soluções:

### ❌ "Pasta backend não encontrada"

**CAUSA:** Você não está na pasta certa

**SOLUÇÃO:**
1. Abra a pasta onde estão os arquivos backend e frontend
2. Execute o script de dentro dessa pasta
3. Certifique-se que você vê as pastas: `backend`, `frontend`, `node_modules`

---

### ❌ "Node.js não instalado"

**CAUSA:** Node.js não está instalado

**SOLUÇÃO:**
1. Baixe: https://nodejs.org/
2. Instale (versão LTS)
3. Reinicie o computador
4. Tente novamente

---

### ❌ "Dependências não instaladas"

**CAUSA:** npm install não foi executado

**SOLUÇÃO:**
```cmd
npm run install:all
```

Aguarde (pode demorar 5-10 minutos).

---

### ❌ "MongoDB não instalado"

**CAUSA:** MongoDB não está instalado

**SOLUÇÃO:**

**Opção A - Local:**
1. Baixe: https://www.mongodb.com/try/download/community
2. Instale
3. Execute: `mongod`

**Opção B - Cloud (Grátis):**
1. Crie conta: https://www.mongodb.com/cloud/atlas/register
2. Crie cluster M0 (grátis)
3. Obtenha connection string
4. Edite `backend/.env` e substitua a linha MONGODB_URI

---

## 🎯 Passo a Passo Manual (Se os scripts não funcionarem):

### 1. Criar arquivo .env do backend

Abra o Bloco de Notas e cole:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/galaxygens
JWT_SECRET=a5f8b9c3d2e7f1a4b6c8d9e2f5a7b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
NODE_ENV=development
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

Salve como: `backend\.env` (dentro da pasta backend)

### 2. Instalar dependências

**PowerShell/CMD:**
```cmd
npm run install:all
```

### 3. Criar Owner

```cmd
cd backend
node scripts\createOwner.js
cd ..
```

### 4. Iniciar MongoDB (Terminal 1)

```cmd
mongod
```

Deixe aberto!

### 5. Iniciar Backend (Terminal 2)

```cmd
cd backend
npm run dev
```

Deixe aberto!

### 6. Iniciar Frontend (Terminal 3)

```cmd
cd frontend
npm start
```

Aguarde o navegador abrir.

---

## 📋 Checklist:

Use `VERIFICAR_ERRO.bat` para verificar:

- [ ] Pasta backend existe
- [ ] Pasta frontend existe
- [ ] Node.js instalado
- [ ] npm instalado
- [ ] Arquivo backend\.env existe
- [ ] Dependências backend instaladas (node_modules existe)
- [ ] Dependências frontend instaladas (node_modules existe)
- [ ] MongoDB instalado (ou Atlas configurado)

---

## 💡 Dica:

**Sempre execute os scripts com botão direito → "Executar como Administrador"**

Isso evita problemas de permissão.

---

## 🐛 Debug Avançado:

Se nada funcionar, faça assim:

1. Pressione **Windows + R**
2. Digite: `cmd`
3. Pressione Enter
4. Digite:
   ```cmd
   cd "C:\Users\SEU_USUARIO\Desktop\Nova pasta (14)"
   ```
   (Substitua pelo caminho correto)
5. Digite:
   ```cmd
   VERIFICAR_ERRO.bat
   ```
6. Veja os erros e copie
7. Me envie no Telegram: t.me/lynxdevz

---

## 📸 Como deve aparecer quando funciona:

**VERIFICAR_ERRO.bat:**
```
[OK] Pasta backend existe
[OK] Pasta frontend existe
[OK] Node.js instalado
[OK] npm instalado
[OK] backend\.env existe
[OK] Dependencias do backend instaladas
[OK] Dependencias do frontend instaladas
```

**INICIAR_SIMPLES.bat:**
```
OK!

Iniciando MongoDB...
Iniciando Backend...
Iniciando Frontend...

Tudo iniciado!
```

3 terminais vão abrir e ficar abertos.

---

## 📞 Ainda com problema?

**Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

Envie:
1. Print do `VERIFICAR_ERRO.bat`
2. Foto da pasta (mostre se tem backend e frontend)
3. Versão do Windows

---

**Galaxy Gen's** - Desenvolvido por Lynx 👑



