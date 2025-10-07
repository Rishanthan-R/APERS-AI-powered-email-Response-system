'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { EmailProvider } from '@/contexts/EmailContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <EmailProvider>
        {children}
      </EmailProvider>
    </AuthProvider>
  )
}