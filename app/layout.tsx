import './globals.css'

export const metadata = { title: 'Paranhos PR — Portal Oficial' }

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}