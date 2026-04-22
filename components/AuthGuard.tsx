"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRole?: 'client' | 'admin'
}

export function AuthGuard({ children, allowedRole }: AuthGuardProps) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (allowedRole && profile?.role !== allowedRole) {
        // Prevent infinite redirects
        const currentPath = window.location.pathname
        const targetPath = profile?.role === 'admin' ? '/admin' : '/client-dashboard'
        
        if (currentPath !== targetPath) {
          router.push(targetPath)
          return
        }
      }

      setAuthorized(true)
      setLoading(false)
    }

    checkAuth()
  }, [router, allowedRole])

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-slate-50">
        <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin" />
        <p className="text-primary/60 font-medium font-serif italic text-sm tracking-wide">
          Verifying credentials...
        </p>
      </div>
    )
  }

  return <>{children}</>
}
