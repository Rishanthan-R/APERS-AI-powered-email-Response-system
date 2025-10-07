import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout' // ADD THIS
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apers - AI Email Assistant',
  description: 'AI-powered email management and automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout> {/* REPLACE AuthProvider with ClientLayout */}
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}