import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vertex',
  description: 'To replace Search bars',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
