# Admin Frontend Full Patch

Este pacote adiciona **dashboards completos** ao `/admin` e utilitários para atualizar o `package.json` automaticamente.

## Conteúdo
- `app/admin/*` → páginas (dashboard, municípios, autoridades, natal, agenda, mapa)
- `components/admin/*` → componentes (KPI cards, gráficos Recharts, tabela, mapa Leaflet)
- `lib/api/fetchers.ts` → alterna entre API real e mocks (`NEXT_PUBLIC_USE_MOCKS`)
- `tools/merge_package_deps.js` → script para **injetar dependências** no `package.json` existente
- `scripts/install_deps.sh` → instala dependências (caso necessário)
- `package.additions.json` → lista das dependências necessárias

## Dependências necessárias
- recharts
- react-leaflet
- leaflet
- date-fns
- react-data-table-component

## Uso
1) Coloque este pacote na **raiz** do repo `paranhospr/web-next` e extraia.
2) Execute o merge de dependências (via Node 18+):
   ```bash
   node tools/merge_package_deps.js
   ```
3) (se o Render não fizer automático) rode:
   ```bash
   bash scripts/install_deps.sh
   ```
4) Commit + deploy (ou use o pipeline do Render).

## Variáveis de ambiente (Render → serviço do SITE)
```
NEXT_PUBLIC_USE_MOCKS=1               # opcional (usa endpoints /api/mock)
NEXTAUTH_URL=https://www.paranhospr.com.br
NEXTAUTH_SECRET=...                   # já configurado
ADMIN_EMAIL=admin@paranhospr.com.br
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_API_URL=https://paranhos-api-v2.onrender.com
```
