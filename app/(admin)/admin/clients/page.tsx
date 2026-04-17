"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthGuard } from "@/components/AuthGuard"
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight,
  MoreHorizontal,
  Mail,
  Calendar,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Client {
  id: string
  full_name: string
  email: string
  enrolled_service: string
  created_at: string
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false })
      
      if (data) setClients(data)
      setLoading(false)
    }
    fetchClients()
  }, [])

  const filteredClients = clients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AuthGuard allowedRole="admin">
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-serif font-bold text-primary">Scholar Directory</h1>
              <p className="text-slate-500 font-medium">Manage and monitor all active academic programs</p>
            </div>
            <div className="flex gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search scholars..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:outline-none w-64 transition-all"
                />
              </div>
              <Button variant="outline" className="bg-white border-slate-200 rounded-xl h-11 px-6 shadow-sm flex gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </header>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Scholar Name</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Program Domain</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem]">Enrollment Date</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[0.65rem] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClients.length > 0 ? filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            {client.full_name?.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-primary">{client.full_name}</p>
                            <p className="text-xs text-slate-400 font-medium">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3 h-3 text-secondary" />
                          <span className="font-bold text-primary/70">{client.enrolled_service || 'Unassigned'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-500">
                        {new Date(client.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link href={`/admin/clients/${client.id}`}>
                          <Button variant="ghost" size="sm" className="text-secondary font-bold hover:bg-secondary/5 h-9 px-4 rounded-lg">
                            Manage Detail
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                        {loading ? 'Retrieving scholars...' : 'No scholars found matching your search.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </AuthGuard>
  )
}
