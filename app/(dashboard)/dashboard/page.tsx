"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Calendar,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard
} from "lucide-react"
import { motion } from "framer-motion"

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [milestones, setMilestones] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [coachNotes, setCoachNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }
      
      setUser(session.user)

      const [profileData, milestoneData, docData, notesData] = await Promise.all([
        supabase.from('profiles').select('*').single(),
        supabase.from('milestones').select('*').order('created_at', { ascending: false }),
        supabase.from('documents').select('*').order('uploaded_at', { ascending: false }),
        supabase.from('coach_notes').select('*').order('created_at', { ascending: false })
      ])

      if (profileData.data) setProfile(profileData.data)
      if (milestoneData.data) setMilestones(milestoneData.data)
      if (docData.data) setDocuments(docData.data)
      if (notesData.data) setCoachNotes(notesData.data)

      setLoading(false)
    }

    loadData()
  }, [router])

  if (loading) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6">
      <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin" />
      <p className="text-primary/60 font-medium font-serif italic">Loading your academic pathway...</p>
    </div>
  )

  return (
    <div className="container py-12 max-w-6xl min-h-[80vh]">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Scholar Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Welcome back, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
          </h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            Enrolled: <span className="text-primary">{profile?.enrolled_service || "Doctoral Success Pathway"}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-slate-200" onClick={() => { supabase.auth.signOut(); router.push('/login'); }}>
            Sign Out
          </Button>
          <Button onClick={() => router.push('/upload')} className="bg-primary text-white border-b-4 border-black/20">
            Submit Document
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Column: Progress & Documents */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Milestones Timeline */}
          <section className="bg-white elevated-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif font-bold text-primary flex items-center gap-3">
                <Calendar className="w-5 h-5 text-secondary" />
                Academic Progress
              </h2>
            </div>
            
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {milestones.length === 0 ? (
                <p className="text-muted-foreground italic">Your academic roadmap is currently being structured.</p>
              ) : (
                milestones.map((m, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={m.id} 
                    className="relative"
                  >
                    <div className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                      m.status === 'complete' ? 'bg-secondary' : 
                      m.status === 'in-progress' ? 'bg-primary' : 'bg-slate-200'
                    }`}>
                      {m.status === 'complete' && <CheckCircle2 className="w-3 h-3 text-white" />}
                      {m.status === 'in-progress' && <Clock className="w-3 h-3 text-white animate-pulse" />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${m.status === 'complete' ? 'text-slate-400 line-through' : 'text-primary'}`}>
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                        {m.status.replace('-', ' ')} • {new Date(m.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Documents Table */}
          <section className="bg-white elevated-card p-8">
            <h2 className="text-xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
              <FileText className="w-5 h-5 text-secondary" />
              Submission History
            </h2>
            <div className="overflow-x-auto">
              {documents.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No documents submitted yet.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      <th className="pb-4 font-bold">Document</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold">Date</th>
                      <th className="pb-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {documents.map(d => (
                      <tr key={d.id} className="group">
                        <td className="py-4 pr-4">
                          <p className="font-bold text-primary group-hover:text-secondary transition-colors truncate max-w-[200px]">
                            {d.filename}
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tight">{d.service_type || 'Dissertation Edit'}</p>
                        </td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest shadow-sm border ${
                            d.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-100' : 
                            d.status === 'EDITED' ? 'bg-secondary/10 text-primary border-secondary/20' : 
                            'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-4 text-xs font-medium text-slate-500">
                          {new Date(d.uploaded_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-secondary">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar: Coach Notes */}
        <div className="space-y-8">
          <section className="bg-primary text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageSquare className="w-24 h-24 rotate-12" />
             </div>
             
             <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 relative z-10">
              <MessageSquare className="w-5 h-5 text-secondary" />
              Coach's Direction
            </h2>
            
            <div className="space-y-6 relative z-10">
              {coachNotes.length === 0 ? (
                <p className="text-slate-300 text-sm italic">New strategic notes will appear here as we progress.</p>
              ) : (
                coachNotes.map(note => (
                  <div key={note.id} className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <p className="text-sm leading-relaxed mb-4 text-slate-100 font-light italic">
                      "{note.content}"
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-secondary">
                      {new Date(note.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
               <p className="text-xs text-slate-300 mb-4 font-light">Need direct clarification?</p>
               <Button className="w-full bg-secondary text-primary font-bold uppercase tracking-widest text-[10px] rounded-none hover:bg-white transition-all">
                  Contact Coach
               </Button>
            </div>
          </section>
          
          <div className="p-8 elevated-card bg-slate-50 border-slate-100">
             <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 italic">Next Step Guidance</h3>
             <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Ensure your methodology draft aligns with the philosophical framework we discussed in our last session.
             </p>
             <div className="h-[2px] w-12 bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}
