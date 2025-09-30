# Paranhos Unificado — Publicação Rápida

## 1) Frontend (paranhospr/web-next)
- Suba `web-next/` na raiz do repo → PR e merge
- Render (SITE):
  NEXTAUTH_URL=https://paranhospr.com.br
  NEXTAUTH_SECRET=<seguro>
  ADMIN_EMAIL=admin@paranhospr.com.br
  ADMIN_PASSWORD=admin123
  NEXT_PUBLIC_API_URL=https://paranhos-api-v2.onrender.com
  NEXT_PUBLIC_USE_MOCKS=1
- Save, rebuild and deploy + Clear build cache
- Validar: / e /admin/login (200)

## 2) API (ParanhosSistema/api-nest)
- Suba `api-nest/` na raiz do repo → PR e merge
- Render (API): esperar Live e rodar:
  curl -X POST "https://paranhos-api-v2.onrender.com/admin/db-push"
  curl -X POST "https://paranhos-api-v2.onrender.com/admin/migrate"
  curl -X POST "https://paranhos-api-v2.onrender.com/admin/seed"
  curl "https://paranhos-api-v2.onrender.com/admin/status"

## 3) Frontend → API real
- Render (SITE): NEXT_PUBLIC_USE_MOCKS=0 → deploy (clear cache)
- Validar: / (200), /admin/health (200), /admin/dashboard (200/302→200 pós login)

## 4) Segurança
- Remover `src/admin-db.controller.ts` e referência no app.module.ts; publicar.


Quero uma estimativa de tempo e um contador do progresso


────────────────────────────────────────
D) LOGIN + PRINTS
10) Login no admin:
    https://paranhospr.com.br/admin/login
    admin@paranhospr.com.br / admin123

11) Enviar prints autenticado:
    - /admin/dashboard (KPIs reais)
    - /admin/municipios
    - /admin/mapa

────────────────────────────────────────
E) SEGURANÇA — REMOVER ENDPOINTS TEMPORÁRIOS
12) API:
    - deletar src/admin-db.controller.ts
    - remover import do app.module.ts
    - commit "🔒 remove admin DB maintenance endpoints"
    - deploy; confirmar 404 em:
      /admin/seed, /admin/migrate, /admin/status

────────────────────────────────────────
📎 ENTREGAS FINAIS (cole aqui)
- JSON de /admin/status (contadores)
- Headers de /, /admin/health, /admin/dashboard
- 3 prints autenticado
- Confirmação 404 endpoints removidos