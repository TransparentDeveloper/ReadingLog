import type { Metadata } from 'next'
import '../../global.css'

export const metadata: Metadata = {
  title: 'Example',
  description: 'Exercise And Test React Code',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
