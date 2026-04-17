import { ReadinessQuiz } from "@/components/ReadinessQuiz";

export default function QuizPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Dissertation Readiness Quiz</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take this 10-question assessment to evaluate your current progress and get a personalized recommendation on your next strategic step.
        </p>
      </div>
      <ReadinessQuiz />
    </div>
  )
}
