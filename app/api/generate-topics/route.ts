import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { field, interest, population, methodology } = body;

    if (!field || !interest || !population || !methodology) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const prompt = `You are an expert academic advisor. Based on the following inputs, generate exactly 3 highly specific, doctoral-level dissertation topics. 
Field: ${field}
Interest: ${interest}
Population: ${population}
Methodology: ${methodology}

Respond ONLY with a valid JSON array of objects. Each object must have these exactly 3 keys:
- "title": A formal, academic title for the dissertation.
- "rationale": A brief 2-sentence explanation of why this topic is highly relevant and adds to the literature.
- "methodology": A brief description of the methodological approach.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const textResponse = response.text || "";
    
    // Attempt to extract JSON if it was wrapped in markdown code blocks
    let cleanedText = textResponse;
    if (cleanedText.includes('```json')) {
      cleanedText = cleanedText.split('```json')[1].split('```')[0].trim();
    } else if (cleanedText.includes('```')) {
      cleanedText = cleanedText.split('```')[1].split('```')[0].trim();
    }

    const topics = JSON.parse(cleanedText);

    return NextResponse.json({ topics }, { status: 200 });

  } catch (error: any) {
    console.error('Topic generator error:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating topics.', details: error.message },
      { status: 500 }
    );
  }
}
