import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Book Publishing Coaching Program",
    description: "A comprehensive end-to-end coaching engagement to take you from book idea to published author.",
    price: "$2,500",
    link: "https://buy.stripe.com/nexcellence-book-coaching",
    cta: "Start Publishing Coaching",
    plan: "Payment plan: $1,000 + 2 instalments of $750"
  },
  {
    title: "Book Writing & Structure Coaching",
    description: "Focused support for outlining, structuring, and maintaining momentum during the book writing process.",
    price: "$1,200",
    link: "https://buy.stripe.com/nexcellence-book-writing",
    cta: "Book Writing Coaching",
    plan: "Payment plan: 3 instalments of $400"
  },
  {
    title: "Self-Publishing Strategy",
    description: "Strategic guidance on navigating Amazon KDP and self-publishing pathways successfully.",
    price: "$750",
    link: "https://buy.stripe.com/nexcellence-self-publishing",
    cta: "Book Strategy Session",
    plan: "Payment plan: 3 instalments of $250"
  },
  {
    title: "Author Positioning & Launch Strategy",
    description: "Develop a strong author brand and a strategic launch plan to maximize your book's reach.",
    price: "$900",
    link: "https://buy.stripe.com/nexcellence-author-positioning",
    cta: "Book Launch Strategy",
    plan: "Payment plan: 3 instalments of $300"
  },
  {
    title: "Book Proposal Development",
    description: "Craft a compelling book proposal ready for traditional publishers and agents.",
    price: "$600",
    link: "https://buy.stripe.com/nexcellence-book-proposal",
    cta: "Book Proposal Development",
    plan: "Payment plan: 3 instalments of $200"
  }
];

export default function BookPublishingPage() {
  return (
    <div className="container py-12 md:py-24 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Book Publishing & Authorship</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert coaching and strategic positioning for authors ready to publish and launch their work.
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
