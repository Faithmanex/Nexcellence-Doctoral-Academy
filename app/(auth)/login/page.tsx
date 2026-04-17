"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ 
      email, 
      options: { emailRedirectTo: `${window.location.origin}/dashboard` } 
    })
    
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the magic login link!')
      
      // Simulation Mode: Automatic redirect based on role
      const isSim = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy')
      if (isSim) {
        setTimeout(async () => {
          const isAdmin = localStorage.getItem('nexcellence-sim-role') === 'admin'
          router.push(isAdmin ? '/admin' : '/client-dashboard')
        }, 1500)
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-muted/20 pb-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Nexcellence Academy™</h1>
        <p className="text-muted-foreground">Client Portal</p>
      </div>
      
      <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
              required
            />
          </div>
          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
          </Button>
        </form>
        {message && (
          <div className="mt-6 p-4 rounded-md bg-primary/10 border border-primary/20 text-center text-sm font-medium text-primary">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
