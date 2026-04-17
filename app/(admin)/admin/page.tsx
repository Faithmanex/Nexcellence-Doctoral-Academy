"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthGuard } from "@/components/AuthGuard"
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Filter,
  MoreVertical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminOverview() {
  const [stats, setStats] = useState({
    activeClients: 0,
    pendingDocs: 0,
    newMessages: 0,
    newContacts: 0
  })

  useEffect(() => {
    async function fetchStats() {
      const [cRes, dRes, coRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'client'),
        supabase.from('documents').select('id', { count: 'exact' }).eq('status', 'under_review'),
        supabase.from('contact_submissions').select('id', { count: 'exact' }).eq('handled', false)
      ])

      setStats({
        activeClients: cRes.count || 0,
        pendingDocs: dRes.count || 0,
        newMessages: 0, // Mock for now
        newContacts: coRes.count || 0
      })
    }
    fetchStats()
  }, [])

  return (
    <AuthGuard allowedRole="admin">
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary">Coach Command Center</h1>
              <p className="text-slate-500 font-medium">Welcome back, Dr. Triplett</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/clients">
                <Button className="bg-primary text-white gap-2 rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
                  <Users className="w-4 h-4" />
                  Manage Clients
                </Button>
              </Link>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Active Scholars" 
              value={stats.activeClients} 
              icon={<Users className="w-5 h-5" />} 
              trend="+2 this week"
              href="/admin/clients"
            />
            <StatCard 
              label="Pending Reviews" 
              value={stats.pendingDocs} 
              icon={<FileText className="w-5 h-5" />} 
              trend="Requires Action"
              variant="warning"
              href="/admin/clients"
            />
            <StatCard 
              label="New Messages" 
              value={stats.newMessages} 
              icon={<MessageSquare className="w-5 h-5" />} 
              trend="No unread"
              href="#"
            />
            <StatCard 
              label="Pending Contacts" 
              value={stats.newContacts} 
              icon={<Bell className="w-5 h-5" />} 
              trend="High Priority"
              variant="urgent"
              href="/admin/contacts"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-serif font-bold text-lg text-primary">Recent Engagement</h2>
                  <Button variant="ghost" size="sm" className="text-secondary font-bold hover:bg-secondary/5">
                    View Audit Log
                  </Button>
                </div>
                <div className="divide-y divide-slate-100">
                  <ActivityItem 
                    user="John Smith" 
                    action="Submitted a document" 
                    meta="Dissertation_Chapter3_v1.docx" 
                    time="2 hours ago" 
                  />
                  <ActivityItem 
                    user="Dr. Triplett" 
                    action="Posted a coach note" 
                    meta="To Scholar: Sarah Jenkins" 
                    time="5 hours ago" 
                  />
                  <ActivityItem 
                    user="Admin Bot" 
                    action="Automated Milestone" 
                    meta="Scholar: David Lee - Proposal Approved" 
                    time="Yesterday" 
                  />
                </div>
              </section>
            </div>

            {/* Quick Actions & Triage */}
            <div className="space-y-6">
              <section className="bg-primary text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h2 className="font-serif font-bold text-xl">Quick Triage</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    You have <span className="text-secondary font-bold">{stats.newContacts}</span> new contact submissions awaiting review.
                  </p>
                  <Link href="/admin/contacts" className="block">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-xl">
                      Review Leads
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-10">
                  <Bell className="w-32 h-32" />
                </div>
              </section>

              <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Administrative Tools</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-xl bg-white hover:border-secondary border border-transparent transition-all flex items-center justify-between group">
                    <span className="text-sm font-bold text-primary">System Settings</span>
                    <MoreVertical className="w-4 h-4 text-slate-300 group-hover:text-secondary" />
                  </button>
                  <button className="w-full text-left p-3 rounded-xl bg-white hover:border-secondary border border-transparent transition-all flex items-center justify-between group">
                    <span className="text-sm font-bold text-primary">Email Templates</span>
                    <MoreVertical className="w-4 h-4 text-slate-300 group-hover:text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AuthGuard>
  )
}

function StatCard({ label, value, icon, trend, variant = 'default', href = '#' }: any) {
  const colors = {
    default: 'text-primary bg-slate-100',
    warning: 'text-amber-600 bg-amber-50',
    urgent: 'text-red-600 bg-red-50'
  }
  
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-secondary/30 transition-all cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${colors[variant as keyof typeof colors]}`}>
            {icon}
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <div>
          <h3 className="text-slate-500 font-medium text-sm mb-1">{label}</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-primary">{value}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{trend}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ActivityItem({ user, action, meta, time }: any) {
  return (
    <div className="px-6 py-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-xs shrink-0">
        {user.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-bold text-primary">{user}</span>
          <span className="mx-2 text-slate-400">·</span>
          <span className="text-slate-600">{action}</span>
        </p>
        <p className="text-xs font-medium text-slate-400 mt-0.5 truncate">{meta}</p>
      </div>
      <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter whitespace-nowrap pt-1">
        {time}
      </div>
    </div>
  )
}
