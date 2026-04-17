"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !token) return

    setLoading(true)
    setMessage('')
    
    try {
      const { data: tokenData, error: tokenError } = await supabase
        .from('upload_tokens')
        .select('*')
        .eq('token', token)
        .eq('used', false)
        .single()

      if (tokenError || !tokenData) {
        throw new Error("Invalid or expired token.")
      }

      const filePath = `${tokenData.user_id}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file)

      if (uploadError) throw uploadError

      await supabase.from('documents').insert({
        user_id: tokenData.user_id,
        filename: file.name,
        storage_path: filePath,
        service_type: tokenData.service_type,
        status: 'pending'
      })

      await supabase.from('upload_tokens').update({ used: true }).eq('id', tokenData.id)

      setMessage("Document uploaded successfully. You can now track its status in your dashboard.")
      setFile(null)
      setToken('')
      
    } catch (err: any) {
      setMessage(`Upload failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12 md:py-24 max-w-2xl mx-auto min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Secure Document Upload</h1>
        <p className="text-xl text-muted-foreground">
          Please enter your unique upload token and select your document (PDF or DOCX).
        </p>
      </div>

      <form onSubmit={handleUpload} className="bg-card border shadow-sm p-8 rounded-xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Upload Token</label>
          <input 
            type="text" 
            placeholder="e.g. 123e4567-e89b-12d3... " 
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
          <p className="text-xs text-muted-foreground mt-2">This was sent to your email after your service purchase.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Document</label>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 border rounded-md bg-muted/30"
            required
          />
          <p className="text-xs text-muted-foreground mt-2">Max file size: 25MB.</p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading || !file || !token}>
          {loading ? 'Uploading...' : 'Securely Upload Document'}
        </Button>

        {message && (
          <div className="mt-4 p-4 border rounded-md bg-secondary/10 text-center font-medium">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
