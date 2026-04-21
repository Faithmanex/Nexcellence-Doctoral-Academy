"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthGuard } from "@/components/AuthGuard"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Circle,
  FileText,
  Download,
  Trash2,
  Send,
  MessageSquare,
  Shield,
  Trash
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientDetail() {
  const { id } = useParams()
  const [client, setClient] = useState<any>(null)
  const [milestones, setMilestones] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [nextStepInput, setNextStepInput] = useState("")
  const [coachNoteInput, setCoachNoteInput] = useState("")
  const [milestoneInput, setMilestoneInput] = useState("")

  useEffect(() => {
    async function fetchData() {
      const [cRes, mRes, dRes, nRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        supabase.from('milestones').select('*').eq('user_id', id).order('created_at', { ascending: true }),
        supabase.from('documents').select('*').eq('user_id', id).order('uploaded_at', { ascending: false }),
        supabase.from('coach_notes').select('*').eq('user_id', id).order('created_at', { ascending: false })
      ])
      
      setClient(cRes.data)
      setMilestones(mRes.data || [])
      setDocuments(dRes.data || [])
      setNotes(nRes.data || [])
    }
    fetchData()
  }, [id])

  const handleAddMilestone = async () => {
    if (!milestoneInput) return
    const { data } = await supabase.from('milestones').insert({
      user_id: id,
      title: milestoneInput,
      status: 'pending'
    })
    setMilestones([...milestones, { title: milestoneInput, status: 'pending', created_at: new Date() }])
    setMilestoneInput("")
  }

  const handleAddNote = async () => {
    if (!coachNoteInput) return
    await supabase.from('coach_notes').insert({
      user_id: id,
      content: coachNoteInput
    })
    setNotes([{ content: coachNoteInput, created_at: new Date() }, ...notes])
    setCoachNoteInput("")
  }

  return (
    <AuthGuard allowedRole="admin">
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link href="/admin/clients">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-primary hover:bg-slate-200/50 rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="space-y-1">
                <h1 className="text-3xl font-serif font-bold text-primary">{client?.full_name}</h1>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Shield className="w-3 h-3 text-secondary" />
                  <span className="uppercase tracking-widest text-[10px]">{client?.enrolled_service || 'Scholar'}</span>
                  <span>·</span>
                  <span>{client?.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <input 
                  type="url" 
                  placeholder="Calendly URL..." 
                  defaultValue={client?.calendly_url || ''}
                  onBlur={async (e) => {
                    await supabase.from('profiles').update({ calendly_url: e.target.value }).eq('id', id);
                  }}
                  className="text-xs bg-white border border-slate-200 px-3 py-2 rounded-xl focus:ring-1 focus:ring-secondary/30 focus:outline-none w-64"
                />
              </div>
              <Button className="bg-primary text-white h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                Update Settings
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content: Progress & Roadmap */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Milestone Management */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white text-primary">
                  <h2 className="font-serif font-bold text-lg">Academic Roadmap</h2>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="New milestone..." 
                      value={milestoneInput}
                      onChange={(e) => setMilestoneInput(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-secondary/30 focus:outline-none w-48"
                    />
                    <Button onClick={handleAddMilestone} size="sm" className="bg-secondary text-white hover:bg-secondary/90 h-8 gap-1 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                      <Plus className="w-3 h-3" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-10">
                    {milestones.map((m, idx) => (
                      <div key={idx} className="relative pl-10 group">
                        <div className="absolute -left-3 top-0 transform -translate-x-1/2 flex items-center justify-center">
                          {m.status === 'complete' ? (
                            <div className="bg-green-500 rounded-full p-1 ring-4 ring-white">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="bg-white border-2 border-slate-200 rounded-full p-2 ring-4 ring-white hover:border-secondary cursor-pointer transition-colors" title="Toggle Milestone Status" aria-label="Toggle Milestone Status">
                              <Circle className="w-3 h-3 text-slate-300 group-hover:text-secondary" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between group">
                          <div className="space-y-1">
                            <h4 className={`font-bold text-base ${m.status === 'complete' ? 'text-slate-400' : 'text-primary'}`}>{m.title}</h4>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300">
                              {m.status === 'complete' ? 'Archived Milestone' : 'In Progress'}
                            </p>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Document Review Flow */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-serif font-bold text-lg text-primary">Document Review Queue</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 uppercase tracking-widest text-[0.65rem] font-bold text-slate-500">
                        <th className="px-6 py-4">Submission</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {documents.length > 0 ? documents.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-primary/40" />
                              <span className="font-bold text-primary">{doc.filename}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-slate-500 font-medium">{doc.service_type}</td>
                          <td className="px-6 py-5">
                            <span className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider ${
                              doc.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary shadow-sm hover:bg-slate-100 border border-slate-100">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase tracking-widest bg-white border-slate-200">
                              Approve
                            </Button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No documents currently in queue.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Sidebar: Notes & Next Steps */}
            <div className="space-y-8">
              
              {/* Post Coach Note */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Direct Consultation Note
                </h3>
                <textarea 
                  placeholder="Type a strategic note to this scholar..." 
                  value={coachNoteInput}
                  onChange={(e) => setCoachNoteInput(e.target.value)}
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:outline-none resize-none transition-all"
                />
                <Button onClick={handleAddNote} className="w-full bg-primary text-white h-11 rounded-xl shadow-lg shadow-primary/10 gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <Send className="w-4 h-4" />
                  Post to Scholar Portal
                </Button>
              </section>

              {/* Next Steps Editor */}
              <section className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden p-6">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Strategic Priorities</h3>
                <div className="space-y-4 mb-6">
                  {client?.next_steps?.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <p className="text-sm font-medium text-white/80">{step.text}</p>
                      <button className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400">
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="New priority..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50"
                  />
                  <Button size="icon" className="h-8 w-8 bg-secondary hover:bg-secondary/90 rounded-lg" title="Add Priority" aria-label="Add new strategic priority">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </section>

              {/* Activity Log Toggle */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholar Engagement Log</span>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-primary/40 uppercase tracking-widest hover:text-primary">
                  Download JSON
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AuthGuard>
  )
}
