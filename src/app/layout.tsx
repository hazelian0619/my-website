import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

// 添加 Noto Sans JP 字体
const notoSansJP = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lian - Portfolio',
  description: 'Personal academic website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={notoSansJP.className}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
} 