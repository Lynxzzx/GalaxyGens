# 🎨 Configuração da Logo

## Instruções para Adicionar a Logo Real

A logo fornecida está no formato WebP. Para usá-la no projeto, siga os passos abaixo:

### 1. Download da Logo

A logo está disponível em:
```
https://tse3.mm.bing.net/th/id/OIP.H1bC9J-zUQVd2VEg5dDJ6AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3
```

### 2. Conversão (se necessário)

Se precisar converter de WebP para PNG:
- Use um conversor online como [Convertio](https://convertio.co/webp-png/)
- Ou use ferramentas de linha de comando:
  ```bash
  # Com ImageMagick
  convert logo.webp logo.png
  
  # Com cwebp
  dwebp logo.webp -o logo.png
  ```

### 3. Preparar as Imagens

Crie as seguintes versões da logo:

1. **logo.png** (512x512px) - Logo principal
2. **favicon.ico** (32x32px) - Ícone da aba
3. **logo192.png** (192x192px) - Para PWA
4. **logo512.png** (512x512px) - Para PWA

### 4. Colocar as Imagens

Coloque todos os arquivos em:
```
frontend/public/
├── logo.png
├── favicon.ico
├── logo192.png
└── logo512.png
```

### 5. Ferramentas para Criar Favicon

Você pode usar:
- [Favicon.io](https://favicon.io/) - Gerador online
- [Real Favicon Generator](https://realfavicongenerator.net/) - Gerador completo

### 6. Logo Placeholder

Atualmente, o projeto está usando um logo SVG placeholder (`logo.svg`).
Substitua pelos arquivos reais quando estiver pronto.

### Dicas

- **Tamanho Recomendado**: 512x512px para melhor qualidade
- **Formato**: PNG com fundo transparente é ideal
- **Favicon**: Pode usar o site favicon.io para gerar de forma fácil
- **Bordas Arredondadas**: Considere usar bordas arredondadas no design

---

**Desenvolvido por Lynx** 👑



