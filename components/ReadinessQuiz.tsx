"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const questions = [
  {
    text: "How clearly defined is your dissertation research question?",
    options: [
      { text: "I don’t have a clear research question yet", points: 0 },
      { text: "I have a general topic but my question still shifts", points: 1 },
      { text: "My research question is clear, focused, and approved by my committee", points: 2 },
    ]
  },
  {
    text: "How much of your literature review is complete?",
    options: [
      { text: "I haven’t started or have only a few sources", points: 0 },
      { text: "I have a working draft but it needs significant development", points: 1 },
      { text: "My literature review is substantially complete and reviewed", points: 2 },
    ]
  },
  {
    text: "How confident are you in your research methodology?",
    options: [
      { text: "I’m unsure what methodology fits my study", points: 0 },
      { text: "I’ve chosen a methodology but have questions about execution", points: 1 },
      { text: "I’m confident in my methodology and have committee approval", points: 2 },
    ]
  },
  {
    text: "How is your relationship with your dissertation committee?",
    options: [
      { text: "I rarely communicate with my committee or feel unsupported", points: 0 },
      { text: "We meet occasionally but communication could be better", points: 1 },
      { text: "I have regular contact and feel aligned with my committee", points: 2 },
    ]
  },
  {
    text: "How much writing have you completed?",
    options: [
      { text: "I haven’t written any chapters yet", points: 0 },
      { text: "I have a draft of 1–2 chapters", points: 1 },
      { text: "I have drafts of 3 or more chapters", points: 2 },
    ]
  },
  {
    text: "How consistent is your dissertation writing practice?",
    options: [
      { text: "I write rarely or only when I’m under pressure", points: 0 },
      { text: "I write occasionally but struggle to maintain momentum", points: 1 },
      { text: "I have a regular writing schedule and mostly stick to it", points: 2 },
    ]
  },
  {
    text: "How would you describe your current timeline to completion?",
    options: [
      { text: "I have no clear timeline or it feels unrealistic", points: 0 },
      { text: "I have a rough timeline but I’ve already missed milestones", points: 1 },
      { text: "I have a realistic timeline with achievable milestones", points: 2 },
    ]
  },
  {
    text: "How is your data collection or analysis progressing?",
    options: [
      { text: "I haven’t started data collection or analysis", points: 0 },
      { text: "I’m in progress but facing challenges", points: 1 },
      { text: "My data collection is complete and analysis is underway or done", points: 2 },
    ]
  },
  {
    text: "How do you feel when you sit down to work on your dissertation?",
    options: [
      { text: "Overwhelmed, avoidant, or paralysed most of the time", points: 0 },
      { text: "Mixed — some productive days, some stuck days", points: 1 },
      { text: "Generally focused and clear on what I need to do", points: 2 },
    ]
  },
  {
    text: "Have you had any formal support (coaching, editing, or consultation) for your dissertation?",
    options: [
      { text: "No, I’ve been working entirely on my own", points: 0 },
      { text: "Some informal support but nothing structured", points: 1 },
      { text: "Yes, I have or have had structured support", points: 2 },
    ]
  }
];

export function ReadinessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setSubmitted(true);
    }
  };

  const calculateResults = () => {
    const score = answers.reduce((acc, curr, idx) => {
      const optionPoints = curr !== -1 ? questions[idx].options[curr].points : 0;
      return acc + optionPoints;
    }, 0);

    if (score <= 6) {
      return {
        label: "Low Readiness",
        title: "You’re in the early stages — and that’s okay.",
        summary: "Your responses suggest you’re still building the foundations of your dissertation. The most important step right now is getting structured support to clarify your research direction and build momentum.",
        service: "Dissertation Strategy Session — $250",
        cta: "Book a Strategy Session",
        link: "/apply"
      };
    } else if (score <= 13) {
      return {
        label: "Medium Readiness",
        title: "You’re further along than you think — but you need a plan.",
        summary: "You have real progress and a foundation to build on. What’s holding you back is structure, momentum, or a gap in a specific area. The right support will accelerate you significantly.",
        service: "Dissertation Success Package — $1,200",
        cta: "Start the Success Package",
        link: "/apply"
      };
    } else {
      return {
        label: "High Readiness",
        title: "You’re close. Let’s get you across the finish line.",
        summary: "Your responses show strong progress and clarity. A targeted editing and coaching engagement will take you from nearly there to defended. Don’t slow down now.",
        service: "90-Day Dissertation Completion Program — $3,997",
        cta: "Enroll in the 90-Day Program",
        link: "/apply"
      };
    }
  };

  if (submitted) {
    const result = calculateResults();
    return (
      <div className="max-w-xl mx-auto p-6 bg-card border rounded-lg shadow-sm text-center">
        <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">
          {result.label}
        </div>
        <h3 className="text-2xl font-bold mb-4">{result.title}</h3>
        <p className="text-muted-foreground mb-6">{result.summary}</p>
        <div className="bg-muted p-4 rounded-md mb-6">
          <p className="font-medium text-foreground">Recommended Next Step:</p>
          <p className="text-sm">{result.service}</p>
        </div>
        <Link href={result.link}>
          <Button size="lg" className="w-full sm:w-auto">{result.cta}</Button>
        </Link>
        <div className="mt-4">
          <Button variant="ghost" onClick={() => { setSubmitted(false); setCurrentQuestion(0); setAnswers(Array(10).fill(-1)); }}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-6 bg-card border rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-2 text-muted-foreground">
          <span>Question {currentQuestion + 1} of 10</span>
          <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6 text-foreground">{questions[currentQuestion].text}</h3>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left p-4 rounded-md border transition-all ${
              answers[currentQuestion] === idx 
              ? 'border-primary ring-1 ring-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-muted'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={answers[currentQuestion] === -1}
        >
          {currentQuestion === questions.length - 1 ? 'Show Results' : 'Next Question'}
        </Button>
      </div>
    </div>
  )
}
