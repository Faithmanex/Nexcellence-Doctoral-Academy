import { useAuth as useAuthContext } from '@/lib/auth-context'

export function useAuth() {
  return useAuthContext()
}

export function useRequireAuth() {
  const { user, loading } = useAuthContext()
  return { user, loading }
}

export function useRequireAdmin() {
  const { user, isAdmin, loading } = useAuthContext()
  return { user, isAdmin, loading }
}