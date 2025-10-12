# ⚡ Como Resolver o Erro "mongod não existe"

## 🎯 Solução Rápida (3 Passos)

### Passo 1: Instalar o MongoDB

**Escolha UMA das opções abaixo:**

#### 🟢 Opção A - Automático (Mais Fácil):
```
1. Execute o arquivo: INSTALAR_MONGODB.bat
2. Siga as instruções na tela
```

#### 🟡 Opção B - Manual (Recomendado):
```
1. Acesse: https://www.mongodb.com/try/download/community
2. Baixe o MongoDB Community Server para Windows
3. Execute o instalador (.msi)
4. IMPORTANTE: Marque "Install MongoDB as a Service"
5. Clique em "Complete Installation"
```

#### 🔵 Opção C - Chocolatey (Se você tem instalado):
```powershell
# Execute no PowerShell como Administrador
choco install mongodb -y
```

### Passo 2: Verificar Instalação

Abra um **NOVO terminal** e execute:
```powershell
mongod --version
```

Se aparecer a versão do MongoDB, está instalado! ✅

### Passo 3: Iniciar o Sistema

```
1. Feche TODOS os terminais abertos
2. Abra um NOVO terminal
3. Execute: INICIAR_SIMPLES.bat
```

## 📚 Precisa de Mais Ajuda?

- **Guia Completo:** Leia o arquivo `MONGODB_GUIA_INSTALACAO.md`
- **Telegram:** [t.me/lynxdevz](https://t.me/lynxdevz)

## 🔄 Alternativa: Usar MongoDB na Nuvem (Grátis)

Se não quiser instalar localmente:

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta grátis
3. Crie um cluster gratuito (512MB)
4. Copie a string de conexão
5. Cole no arquivo `backend\.env`:
   ```
   MONGODB_URI=sua_string_de_conexao_aqui
   ```

---

**Galaxy Gen's** - Desenvolvido por Lynx 🌟

