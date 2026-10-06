# MG Guinchos — Landing page

Landing page da MG Guinchos (guincho 24h em Igrejinha e Região). Site estático em HTML, CSS e JavaScript puro, pronto para a Vercel. Não tem dependências: o único "build" é um script que coloca o endereço do site nos lugares certos.

## Estrutura

```
site/                 ← tudo que vai para o ar
  index.html          ← conteúdo da página (textos, links, SEO)
  styles.css          ← visual (cores no topo, em :root)
  main.js             ← carrossel de fotos
  assets/             ← logo, ícones, imagem de compartilhamento (og-image)
  fotos/              ← fotos de atendimentos do carrossel
  robots.txt, sitemap.xml, favicon.ico
scripts/build.mjs     ← copia site/ para dist/ preenchendo o endereço do site
vercel.json           ← configuração da Vercel (roda o build e publica dist/)
project/, chats/      ← design original do Claude Design (só referência, não é publicado)
```

## Rodar localmente

```bash
npm run dev
# abra http://localhost:4173
```

## Fotos do carrossel

Coloque as fotos em `site/fotos/` com os nomes `atendimento-1.jpg` … `atendimento-16.jpg` (em pé, por exemplo 800x1067, até ~300 KB cada; sem dados de localização).
Fotos que não existirem são escondidas sozinhas. Enquanto não houver nenhuma, aparecem os espaços vazios do layout.
Para mudar nomes ou quantidade, edite os `<figure class="slide">` em `site/index.html`.

## Publicar na Vercel

1. Suba este repositório para o GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório e clique em **Deploy**. O `vercel.json` já configura tudo.
3. Domínio: em **Settings → Domains**, adicione o domínio (ex.: `mgguinchos.com.br`) e configure o DNS no registro.br conforme a Vercel indicar.

## Antes de entregar ao cliente

- **Domínio:** não precisa trocar nada no código. Os arquivos usam `__SITE_URL__` e, na Vercel, o build troca isso pelo domínio de produção (o domínio próprio, se já estiver configurado, ou o `.vercel.app`). **Depois de adicionar o domínio na Vercel, faça um Redeploy** (Deployments → ⋯ → Redeploy) para o site passar a usar o endereço novo. Para forçar um endereço, crie a variável de ambiente `SITE_URL` na Vercel.
- **Cidades atendidas:** a lista fica em `site/index.html`, em dois lugares: a seção "Onde atendemos" (`<ul class="cities__list">`) e o `areaServed` do bloco `application/ld+json`.
- **WhatsApp:** todos os botões usam `https://wa.me/message/YY4A3Y4D3JLIG1`.
- **Telefone:** os botões "Ligar" usam `tel:+5551997976767`, ou seja, (51) 99797-6767. Também aparece no rodapé e nos dados para o Google.
- **Fotos:** adicione as fotos reais em `site/fotos/`.
