// components/ProtectedRoute.tsx
'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push('/login') // Redirect to login if not authenticated
  }, [session, status, router])

  if (status === "loading") {
    return <div>Loading...</div> // Or your custom loading component
  }

  return session ? <>{children}</> : null
}