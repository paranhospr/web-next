export const metadata = {
  title: 'Paranhos PR',
  description: 'Portal Paranhos PR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
