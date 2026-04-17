"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthGuard } from "@/components/AuthGuard"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Download, 
  FileText, 
  ExternalLink,
  MessageSquare,
  Calendar,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react"

interface Profile {
  full_name: string
  enrolled_service: string
  next_steps: { text: string; order: number }[]
  calendly_url: string
}

interface Milestone {
  id: string
  title: string
  status: 'complete' | 'in-progress' | 'pending'
  created_at: string
}

interface Document {
  id: string
  filename: string
  status: string
  uploaded_at: string
  service_type: string
}

interface CoachNote {
  id: string
  content: string
  created_at: string
}

export default function ClientDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [notes, setNotes] = useState<CoachNote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const [pRes, mRes, dRes, nRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', session.user.id).single(),
        supabase.from('milestones').select('*').eq('user_id', session.user.id).order('created_at', { ascending: true }),
        supabase.from('documents').select('*').eq('user_id', session.user.id).order('uploaded_at', { ascending: false }),
        supabase.from('coach_notes').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false })
      ])

      setProfile(pRes.data)
      setMilestones(mRes.data || [])
      setDocuments(dRes.data || [])
      setNotes(nRes.data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <AuthGuard allowedRole="client">
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-serif font-bold text-primary">
                Welcome back, {profile?.full_name?.split(' ')[0]}
              </h1>
              <div className="flex items-center gap-2 text-primary/60 font-medium">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-sm tracking-wide uppercase">{profile?.enrolled_service || 'Academic Scholar'}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 gap-2 h-11 px-6 shadow-sm rounded-xl">
                <Calendar className="w-4 h-4" />
                Schedule Session
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90 gap-2 h-11 px-6 shadow-lg shadow-primary/20 rounded-xl">
                <FileText className="w-4 h-4" />
                Submit Document
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Progress & Milestones */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Progress Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Project Status</p>
                    <h3 className="text-xl font-bold text-primary">On Track</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Documents Reviewed</p>
                    <h3 className="text-xl font-bold text-primary">{documents.length} Files</h3>
                  </div>
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>

              {/* Milestones Vertical Timeline */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-serif font-bold text-lg text-primary">Progression Roadmap</h2>
                  <span className="text-xs font-bold text-primary/40 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-tighter">Academic Journey</span>
                </div>
                <div className="p-8">
                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-10">
                    {milestones.length > 0 ? milestones.map((m, idx) => (
                      <div key={m.id || idx} className="relative pl-10 group">
                        {/* Milestone Connector Label */}
                        <div className="absolute -left-3 top-0 transform -translate-x-1/2 flex items-center justify-center">
                          {m.status === 'complete' ? (
                            <div className="bg-secondary rounded-full p-1 ring-4 ring-white">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          ) : m.status === 'in-progress' ? (
                            <div className="bg-primary rounded-full p-1.5 ring-4 ring-white animate-pulse">
                              <Clock className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="bg-white border-2 border-slate-200 rounded-full p-2 ring-4 ring-white">
                              <Circle className="w-3 h-3 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <h4 className={`font-bold text-base ${m.status === 'complete' ? 'text-slate-400 line-through' : 'text-primary'}`}>
                            {m.title}
                          </h4>
                          <p className="text-sm text-slate-500 font-medium">
                            {m.status === 'complete' ? 'Completed ' : m.status === 'in-progress' ? 'Targeted Completion: TBD' : 'Planned Milestone'}
                            {m.status === 'complete' && m.created_at && `• ${new Date(m.created_at).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-10">
                        <p className="text-slate-400 italic">No milestones defined yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Submission History Table */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-serif font-bold text-lg text-primary">Document Repositories</h2>
                  <Button variant="ghost" size="sm" className="text-secondary font-bold hover:text-secondary hover:bg-secondary/5 h-8">
                    View Archive
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Document Name</th>
                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Service Case</th>
                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Status</th>
                        <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {documents.length > 0 ? documents.map((doc, idx) => (
                        <tr key={doc.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-primary/40" />
                              <span className="font-bold text-primary truncate max-w-[150px]">{doc.filename}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 font-medium text-slate-600">{doc.service_type}</td>
                          <td className="px-6 py-5">
                            <span className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider ${
                              doc.status === 'EDITED' || doc.status === 'approved' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-primary/10 text-primary'
                            }`}>
                              {doc.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary/40 hover:text-secondary hover:bg-secondary/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">
                            No documents submitted yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Next Steps & Coach Notes */}
            <div className="space-y-8">
              
              {/* Next Steps Checklist */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-primary/5">
                  <h2 className="font-serif font-bold text-lg text-primary">Strategic Next Steps</h2>
                </div>
                <div className="p-6 space-y-4">
                  {profile?.next_steps && profile.next_steps.length > 0 ? profile.next_steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-secondary/20 hover:bg-secondary/5 transition-all group">
                      <div className="mt-0.5">
                        <div className="w-5 h-5 border-2 border-slate-300 rounded group-hover:border-secondary transition-colors" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  )) : (
                    <p className="text-sm text-slate-400 italic text-center py-4">
                      Awaiting strategic update from your coach.
                    </p>
                  )}
                </div>
              </section>

              {/* Coach Notes Sidebar */}
              <section className="bg-primary text-white rounded-2xl shadow-xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageSquare className="w-24 h-24 rotate-12" />
                </div>
                
                <h2 className="font-serif font-bold text-xl mb-6 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Coach Consultation
                </h2>

                <div className="space-y-6 relative z-10">
                  {notes.length > 0 ? notes.map((note, idx) => (
                    <div key={note.id || idx} className="space-y-3 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <p className="text-sm border-l-2 border-secondary pl-4 py-1 italic text-white/90 leading-relaxed font-medium">
                        "{note.content}"
                      </p>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold pl-4">
                        Posted {new Date(note.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  )) : (
                    <p className="text-white/60 text-sm italic">
                      Check back soon for direct feedback from Dr. Triplett.
                    </p>
                  )}
                  
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-0 h-11 rounded-xl shadow-lg mt-4 gap-2 font-bold uppercase tracking-widest text-xs">
                    Message Dr. Triplett
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </section>

              {/* Quick Links */}
              <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Scholar Resources</h3>
                <nav className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white text-sm font-bold text-primary transition-all">
                    University Style Guide
                    <ExternalLink className="w-3 h-3 opacity-30" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white text-sm font-bold text-primary transition-all">
                    Dissertation Templates
                    <ExternalLink className="w-3 h-3 opacity-30" />
                  </a>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
