import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '1337 GitHub Banner',
  description: 'A 1337 students banner for GitHub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
