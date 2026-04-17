import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// --- SUPABASE SIMULATION MODE ---
// Provides a mock client if actual credentials are not configured.
const createMockClient = () => {
  console.warn("Supabase Simulation Mode Active: Using mock client.")
  return {
    auth: {
      signInWithOtp: async ({ email }: { email: string }) => {
        localStorage.setItem('nexcellence-sim-session', JSON.stringify({
          user: { email, id: 'sim-user-123' },
          expires_at: Math.floor(Date.now() / 1000) + 3600
        }))
        return { data: { user: { email } }, error: null }
      },
      getSession: async () => {
        const session = localStorage.getItem('nexcellence-sim-session')
        return { data: { session: session ? JSON.parse(session) : null }, error: null }
      },
      getUser: async () => {
        const session = localStorage.getItem('nexcellence-sim-session')
        const user = session ? JSON.parse(session).user : null
        return { data: { user }, error: null }
      },
      signOut: async () => {
        localStorage.removeItem('nexcellence-sim-session')
        return { error: null }
      },
      onAuthStateChange: (callback: any) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
      }
    },
    from: (table: string) => {
      const mockQuery = {
        select: () => mockQuery,
        order: () => mockQuery,
        limit: () => mockQuery,
        eq: () => mockQuery,
        single: () => mockQuery,
        async then(resolve: any) {
          const session = localStorage.getItem('nexcellence-sim-session')
          const user = session ? JSON.parse(session).user : null
          
          if (table === 'milestones') {
            resolve({ data: [
              { id: 1, title: 'Dissertation Proposal Approved', status: 'complete', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
              { id: 2, title: 'Chapter 1 & 2 Draft Sync', status: 'in-progress', created_at: new Date(Date.now() - 86400000).toISOString() },
              { id: 3, title: 'Methodology Review', status: 'pending', created_at: new Date().toISOString() }
            ], error: null })
          } else if (table === 'documents') {
            resolve({ data: [
              { id: 101, filename: 'LiteratureReview_v2.docx', status: 'EDITED', uploaded_at: new Date(Date.now() - 86400000 * 2).toISOString(), service_type: 'Editing' },
              { id: 102, filename: 'Methodology_Draft.docx', status: 'UNDER-REVIEW', uploaded_at: new Date().toISOString(), service_type: 'Consultation' }
            ], error: null })
          } else if (table === 'coach_notes') {
            resolve({ data: [
              { id: 1, content: "Excellent progress on the lit review. Focus on the transition to the methodology next.", created_at: new Date().toISOString() }
            ], error: null })
          } else if (table === 'profiles') {
            // Default to client, unless specifically set otherwise in storage for testing
            const isAdmin = localStorage.getItem('nexcellence-sim-role') === 'admin'
            resolve({ data: { 
              id: user?.id,
              full_name: user?.email?.split('@')[0] || 'Simulated User', 
              email: user?.email,
              enrolled_service: 'Full 90-Day Program', 
              role: isAdmin ? 'admin' : 'client',
              next_steps: [
                { text: 'Finalize methodology draft', order: 0 },
                { text: 'Schedule committee sync', order: 1 }
              ],
              calendly_url: 'https://calendly.com/nexcellence'
            }, error: null })
          } else if (table === 'contact_submissions') {
            resolve({ data: [], error: null })
          } else {
            resolve({ data: [], error: null })
          }
        }
      }
      return mockQuery
    },
    insert: async (data: any) => {
      console.log(`[SIMULATION] Data inserted into:`, data)
      return { data, error: null }
    }
  } as any
}

// Helper to check if simulation mode is active
export const isSimulation = !supabaseUrl || supabaseUrl.includes('dummy')

export const supabase = isSimulation
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey)
