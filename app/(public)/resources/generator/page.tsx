import { TopicGenerator } from "@/components/TopicGenerator";

export default function GeneratorPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">AI Dissertation Topic Generator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Share your field, interest, and methodology preference, and our AI will generate 3 highly specific, academic dissertation topics designed for doctoral-level rigor.
        </p>
      </div>
      <TopicGenerator />
    </div>
  )
}
