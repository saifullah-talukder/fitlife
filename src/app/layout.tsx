import { Amplify } from 'aws-amplify'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import awsExports from '../aws-exports'
import './globals.css'

Amplify.configure(awsExports)

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fitlife',
  description: 'Live a healthy and fit life',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
