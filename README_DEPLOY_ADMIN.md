# Admin mínimo - Paranhos

## Instruções rápidas
1. Extraia este pacote **na raiz** do projeto Next.js do frontend.
2. Verifique se criou `app/admin/...` com as páginas.
3. Faça commit e push na `main`.
4. No Render, build: `npm install && npm run build` / start: `npm run start` (Node 18).
5. Teste `https://www.paranhospr.com.br/admin`.

## Observações
- Não sobrescrevemos `package.json` ou `next.config.js` existentes.
- Se o build travar por ESLint/TypeScript, adicione em `next.config.js`:
  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    experimental: { appDir: true },
  }
  module.exports = nextConfig
  ```
