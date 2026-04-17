import { Star } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote: "The 90-Day program was the exact accountability I needed to finish my chapters. The feedback was rigorous and compassionate.",
      author: "Dr. S., Ed.D. Graduate",
      role: "Doctoral Academy Alumnus"
    },
    {
      quote: "My tenure dossier was significantly strengthened by the strategic positioning work we did. Invaluable coaching.",
      author: "Dr. M., Associate Professor",
      role: "Faculty Advancement Client"
    },
    {
      quote: "The Elite Program transformed how I view my academic trajectory. I published my book and secured an administrative role within 6 months.",
      author: "Dr. R., Academic Dean",
      role: "Elite Program Client"
    }
  ]
  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Client Success Stories</h1>
      <div className="space-y-8">
        {testimonials.map((t, i) => (
          <div key={i} className="border bg-card p-8 rounded-xl relative shadow-sm">
            <div className="flex text-primary mb-4">
              {[...Array(5)].map((_, idx) => <Star key={idx} className="fill-current w-5 h-5" />)}
            </div>
            <p className="text-xl italic text-muted-foreground mb-6">"{t.quote}"</p>
            <div>
              <p className="font-bold">{t.author}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
