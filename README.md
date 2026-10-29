# Forma & Madeira — Landing page demonstrativa

Landing page premium e reutilizável para marcenarias e empresas de móveis planejados. O projeto é uma demonstração independente: não representa uma empresa existente e usa imagens genéricas ilustrativas licenciadas do Unsplash, copiadas para `public/images/` para evitar hotlink.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar e publicar

```bash
npm run typecheck
npm run lint
npm run build
```

O projeto usa `output: 'export'` e gera a versão estática em `out/`, compatível com Cloudflare Pages, Netlify e hospedagens estáticas semelhantes. Para Cloudflare Pages, use `npm run build` como comando e `out` como diretório de saída.

## Personalização rápida

- Identidade, modo (`demo`/`production`), contatos, cidade e SEO: `src/config/business.ts`.
- Projetos e filtros: `src/data/projects.ts`.
- Ambientes/serviços: `src/data/services.ts`.
- Imagens: substitua os arquivos em `public/images/`, mantendo os nomes ou atualizando os caminhos nos arquivos de dados.
- Componentes e layout: `src/components/landing/MarcenariaLanding.tsx` e `app/globals.css`.

No modo `demo`, o WhatsApp fica desativado, a página recebe `noindex` e o visitante recebe uma prévia copiável da mensagem. Para o modo comercial, defina `mode: 'production'`, preencha `siteUrl` com o domínio real e `whatsapp` com o número em formato internacional, apenas dígitos (ex.: `5547999999999`). Instagram, endereço e cidades atendidas também devem ser confirmados antes da publicação.

O favicon está em `app/icon.svg` e a imagem usada em compartilhamentos está em `public/og-image.svg`. O `robots.txt` e o `sitemap.xml` são gerados a partir do modo configurado.

Ao publicar a demonstração, defina `NEXT_PUBLIC_SITE_URL` com a URL pública real para que os metadados de compartilhamento usem o endereço correto. Exemplo: `NEXT_PUBLIC_SITE_URL=https://seu-endereco-publico.com npm run build`.

## Conteúdo pendente por segurança

Depoimentos e o comparador antes/depois estão preparados, mas não são exibidos enquanto não houver material real/autorizado. O comparador é ativado em `src/data/projects.ts` somente com duas imagens correspondentes do mesmo ambiente.

## Origem das imagens

As imagens foram baixadas de páginas do Unsplash e armazenadas localmente para esta demonstração. Consulte `IMAGE-SOURCES.md` para a relação de URLs de origem e substitua-as por fotografias fornecidas/autorizadas pelo cliente antes de uma entrega comercial.
