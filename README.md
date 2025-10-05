
# Paranhos PR - Admin Panel

Sistema administrativo para o município de Paranhos PR.

## Tecnologias

- Next.js 14.2.13
- React 18.2.0
- NextAuth 4.24.11
- TypeScript
- Tailwind CSS

## Estrutura

```
app/
├── layout.tsx          # Layout raiz
├── providers.tsx       # SessionProvider
├── globals.css         # Estilos globais
├── admin/
│   ├── login/
│   │   └── page.tsx   # Página de login
│   └── dashboard/
│       └── page.tsx   # Dashboard protegido
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts # Configuração NextAuth
```

## Variáveis de Ambiente

```env
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=seu-secret-aqui
ADMIN_EMAIL=admin@paranhospr.com.br
ADMIN_PASSWORD=sua-senha-aqui
NEXT_PUBLIC_API_URL=https://paranhos-api-v2.onrender.com
```

## Deploy

1. Configure as variáveis de ambiente
2. Deploy na Vercel
3. Acesse /admin/login para fazer login

## Credenciais Padrão

- Email: admin@paranhospr.com.br
- Senha: Admin2024Paranhos
