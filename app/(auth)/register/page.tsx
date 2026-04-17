"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/form-input'
import { registerSchema, type RegisterFormData } from '@/lib/validation'
import { Eye, EyeOff, UserPlus, AlertCircle, Loader2, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setErrors({})

    const validation = registerSchema.safeParse(formData)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    const { error } = await signUp(formData.email, formData.password, formData.fullName)

    if (error) {
      setSubmitError(error.message || 'Failed to create account')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-muted/20 pb-20 px-4">
        <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-xl text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4">Account Created!</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation email to <strong>{formData.email}</strong>. 
            Please check your inbox and click the confirmation link to activate your account.
          </p>
          <Link href="/login">
            <Button className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-muted/20 pb-20 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 font-serif text-primary">Nexcellence Academy</h1>
        <p className="text-muted-foreground">Create Your Scholar Account</p>
      </div>

      <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {submitError && (
          <div className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Dr. Jane Smith"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              error={errors.fullName}
              autoComplete="name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@university.edu"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}