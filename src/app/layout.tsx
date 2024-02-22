import Background from '@/components/background'
import { Amplify } from 'aws-amplify'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import awsExports from '../aws-exports'
import './globals.css'

Amplify.configure(awsExports)

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitLife',
  description: 'Live a healthy and fit life',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <link rel="icon" href="/images/fitness.png" sizes="any" />
        <main className="relative min-h-screen w-full bg-white">
          <Background />
          <div className="relative">{children}</div>
        </main>
      </body>
    </html>
  )
}
