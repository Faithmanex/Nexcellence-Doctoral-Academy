"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const FIELDS = [
  "Education", "Business & Management", "Psychology", 
  "Nursing & Healthcare", "Public Policy & Administration", 
  "Social Work", "Criminal Justice", "Communications & Media", 
  "Technology & Information Systems", "Other"
];

const POPULATIONS = [
  "K–12 students or educators", "Higher education / college students", 
  "Healthcare workers or patients", "Nonprofit or community organisations", 
  "Corporate or private sector employees", "Government or public sector", 
  "Underserved or marginalised communities", "Other"
];

const METHODOLOGIES = [
  "Qualitative (interviews, focus groups, case study)",
  "Quantitative (surveys, statistical analysis)",
  "Mixed Methods (both qualitative and quantitative)",
  "I’m not sure yet — suggest what fits"
];

interface Topic {
  title: string;
  rationale: string;
  methodology: string;
}

export function TopicGenerator() {
  const [step, setStep] = useState(1);
  const [field, setField] = useState("");
  const [otherField, setOtherField] = useState("");
  const [interest, setInterest] = useState("");
  const [population, setPopulation] = useState("");
  const [otherPopulation, setOtherPopulation] = useState("");
  const [methodology, setMethodology] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Topic[] | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Load attempts from sessionStorage
    const stored = sessionStorage.getItem('nda_topic_attempts');
    if (stored) setAttempts(parseInt(stored, 10));
  }, []);

  const handleGenerate = async () => {
    if (attempts >= 3) {
      setError("You have reached the maximum number of generations (3) for this session.");
      return;
    }

    setLoading(true);
    setError("");

    const finalField = field === "Other" ? otherField : field;
    const finalPopulation = population === "Other" ? otherPopulation : population;

    try {
      const res = await fetch('/api/generate-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field: finalField,
          interest,
          population: finalPopulation,
          methodology
        })
      });

      if (!res.ok) throw new Error("API responded with an error");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResults(data.topics);
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      sessionStorage.setItem('nda_topic_attempts', newAttempts.toString());
      
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    handleGenerate();
  }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-card border rounded-lg shadow-sm">
        <h3 className="text-2xl font-bold mb-6 text-center">Your Generated Topics</h3>
        <div className="space-y-6 mb-8">
          {results.map((topic, idx) => (
            <div key={idx} className="p-4 border rounded-md">
              <h4 className="font-bold text-lg mb-2">{topic.title}</h4>
              <p className="text-muted-foreground mb-3">{topic.rationale}</p>
              <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
                Methodology: {topic.methodology}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={resetForm} disabled={attempts >= 3 || loading} variant="outline">
            {loading ? "Generating..." : "Generate 3 New Topics"}
          </Button>
        </div>
        
        {attempts >= 3 && (
          <p className="text-destructive text-sm text-center mt-4">Generation limit reached for this session.</p>
        )}

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground mb-4">Need help developing your topic?</p>
          <a href="https://buy.stripe.com/nexcellence-research-consultation" target="_blank" rel="noopener noreferrer">
            <Button>Book a Research Consultation — $300</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-card border rounded-lg shadow-sm">
      <div className="mb-6 flex space-x-2 justify-center">
        {[1, 2, 3, 4, 5].map(num => (
          <div key={num} className={`h-2 flex-1 rounded-full ${num <= step ? 'bg-primary' : 'bg-secondary'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What is your academic field?</h3>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={field}
            onChange={e => setField(e.target.value)}
          >
            <option value="" disabled>Select a field...</option>
            {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          {field === "Other" && (
            <input 
              type="text" 
              placeholder="Please specify" 
              className="w-full p-2 border rounded-md mt-2 bg-background"
              value={otherField}
              onChange={e => setOtherField(e.target.value)}
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Describe your research interest in one or two sentences.</h3>
          <textarea 
            className="w-full p-2 border rounded-md h-32 bg-background"
            placeholder="e.g. I’m interested in how remote work policies affect employee mental health in higher education..."
            maxLength={200}
            value={interest}
            onChange={e => setInterest(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-right">{interest.length}/200</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Who or what is your study focused on?</h3>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={population}
            onChange={e => setPopulation(e.target.value)}
          >
            <option value="" disabled>Select population...</option>
            {POPULATIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {population === "Other" && (
            <input 
              type="text" 
              placeholder="Please specify" 
              className="w-full p-2 border rounded-md mt-2 bg-background"
              value={otherPopulation}
              onChange={e => setOtherPopulation(e.target.value)}
            />
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Do you have a methodology preference?</h3>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={methodology}
            onChange={e => setMethodology(e.target.value)}
          >
            <option value="" disabled>Select methodology...</option>
            {METHODOLOGIES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to generate your topics</h3>
          <p className="text-muted-foreground mb-6">We will use your inputs to craft 3 highly specific dissertation topics.</p>
          
          {error && <p className="text-destructive font-medium mb-4">{error}</p>}
          
          <Button onClick={handleGenerate} disabled={loading || attempts >= 3} size="lg" className="w-full">
            {loading ? "Generating your personalised dissertation topics…" : "Generate My Topics"}
          </Button>
          
          {attempts >= 3 && (
            <p className="text-destructive text-sm mt-4">You have reached the limit of 3 generations per session.</p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1 || loading}>
          Back
        </Button>
        {step < 5 && (
          <Button 
            onClick={() => setStep(s => Math.min(5, s + 1))} 
            disabled={
              (step === 1 && !field) || 
              (step === 1 && field === "Other" && !otherField) ||
              (step === 2 && !interest.trim()) ||
              (step === 3 && !population) ||
              (step === 3 && population === "Other" && !otherPopulation) ||
              (step === 4 && !methodology)
            }
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
