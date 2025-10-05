# Paranhos PR - Web Next

Sistema web do município de Paranhos PR.

## Stack

- Next.js 14.2.13
- React 18.2.0
- NextAuth 4.24.11
- TypeScript
- Tailwind CSS

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy

Deploy automático via Vercel conectado ao GitHub.

### Variáveis de Ambiente

```
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=seu-secret-aqui
ADMIN_EMAIL=admin@paranhospr.com.br
ADMIN_PASSWORD=sua-senha-aqui
NEXT_PUBLIC_API_URL=https://paranhos-api-v2.onrender.com
```

## Estrutura

- `/app` - Páginas e rotas da aplicação
- `/app/admin` - Área administrativa protegida
- `/app/api/auth` - Autenticação NextAuth
- `/middleware.ts` - Proteção de rotas

## Autenticação

Sistema de autenticação via NextAuth com provider de credenciais.

Acesso admin: `/admin/login`
