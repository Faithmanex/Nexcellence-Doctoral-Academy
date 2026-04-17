"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()
      
      if (profile?.role === 'admin') {
        setIsAdmin(true)
      } else {
        router.push("/dashboard")
      }
      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) return <div className="p-24 text-center">Loading admin portal...</div>
  if (!isAdmin) return null

  return (
    <div className="container py-12 max-w-6xl min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4 text-destructive">System Administrator Portal</h1>
      <p className="text-muted-foreground mb-12">
        You are authenticated as an Administrator. This dashboard is a placeholder. Managing clients, setting milestones, adding coach notes, and generating new upload tokens is primarily executed directly through your Supabase Studio project interface until bespoke internal tooling is built.
      </p>
      
      <div className="p-8 border-2 border-destructive/20 bg-destructive/5 rounded-xl">
        <h2 className="font-bold text-xl mb-4">Quick Links:</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Access Supabase Project Dashboard to manage `profiles` table.</li>
          <li>Access Stripe Dashboard to manage recurring billing.</li>
          <li>Set `role` to `admin` in the database to grant other users access.</li>
        </ul>
      </div>
    </div>
  )
}
