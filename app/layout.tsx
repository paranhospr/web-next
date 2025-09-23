
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prefeitura de Paranhos - Portal Oficial',
  description: 'Portal oficial da Prefeitura de Paranhos - Em implantação',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3498db" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
