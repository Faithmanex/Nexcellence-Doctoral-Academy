import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function CheckoutSuccess({ searchParams }: { searchParams: { program?: string } }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/30 py-20 px-6 font-sans">
      <div className="bg-white p-12 shadow-2xl max-w-2xl w-full text-center border-t-8 border-secondary">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-8 text-secondary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary mb-6 uppercase tracking-tight">Investment Verified.</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed italic">
          "The first step toward scholarly authority is the decision to commit."
        </p>
        
        <div className="bg-muted p-8 rounded text-left mb-10 border-l-4 border-secondary">
           <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 italic">Next Steps — Simulated Phase</h3>
           <ul className="space-y-4 text-sm">
             <li className="flex gap-3"><span className="text-secondary font-bold">1.</span> Onboarding email sent to your registered address.</li>
             <li className="flex gap-3"><span className="text-secondary font-bold">2.</span> Access your Scholar Dashboard to complete your initial audit.</li>
             <li className="flex gap-3"><span className="text-secondary font-bold">3.</span> Schedule your first strategy session with Dr. Triplett.</li>
           </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/dashboard">
             <Button className="h-14 px-8 bg-primary text-white hover:bg-[#192f59] font-bold uppercase tracking-widest rounded-none">
                Go to Dashboard
             </Button>
           </Link>
           <Link href="/">
             <Button variant="outline" className="h-14 px-8 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest rounded-none">
                Return Home
             </Button>
           </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t">
           <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
             Simulated Transaction ID: NX-{Math.random().toString(36).substr(2, 9).toUpperCase()}
           </p>
        </div>
      </div>
    </div>
  )
}
