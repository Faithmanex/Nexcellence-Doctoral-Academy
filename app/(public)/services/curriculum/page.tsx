import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Custom Course Design",
    description: "Complete instructional design and curriculum development for a single course.",
    price: "$1,200",
    link: "https://buy.stripe.com/nexcellence-course-design",
    cta: "Book Custom Course Design",
    plan: "Payment plan: 3 instalments of $400"
  },
  {
    title: "Course Enhancement / Redesign",
    description: "Strategic redesign of an existing course to improve engagement or meet new standards.",
    price: "$1,500",
    link: "https://buy.stripe.com/nexcellence-course-enhancement",
    cta: "Book Course Enhancement",
    plan: "Payment plan: 3 instalments of $500"
  },
  {
    title: "Multi-Course Program Design",
    description: "Comprehensive curriculum alignment and design for an entire academic program.",
    price: "$4,500",
    link: "https://buy.stripe.com/nexcellence-program-design",
    cta: "Book Program Design",
    plan: "Payment plan: 3 instalments of $1,500"
  },
  {
    title: "Certificate / Training Program Design",
    description: "Targeted instructional design for professional development or certification tracks.",
    price: "$1,800",
    link: "https://buy.stripe.com/nexcellence-certificate-program",
    cta: "Book Certificate Design",
    plan: "Payment plan: 3 instalments of $600"
  },
  {
    title: "Academic Program Proposal",
    description: "Development of formal proposals for new academic programs, ready for institutional review.",
    price: "$2,000",
    link: "https://buy.stripe.com/nexcellence-program-proposal",
    cta: "Book Proposal Development",
    plan: "Payment plan: $750 + $625 + $625"
  }
];

export default function CurriculumDesignPage() {
  return (
    <div className="container py-12 md:py-24 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Curriculum Design & Academic Innovation</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert instructional design and curriculum strategy for faculty, departments, and institutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="border bg-card text-card-foreground rounded-xl p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-8 flex-1">{service.description}</p>
            <div className="mb-8 p-4 bg-muted/50 rounded-lg">
              <span className="text-3xl font-bold block mb-1">{service.price}</span>
              {service.plan && <p className="text-sm border-t pt-2 mt-2 text-muted-foreground">{service.plan}</p>}
            </div>
            <a href={service.link} target="_blank" rel="noopener noreferrer" className="mt-auto block">
              <Button className="w-full" size="lg">{service.cta}</Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
