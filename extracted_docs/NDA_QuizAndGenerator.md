Nexcellence Academy™

Interactive Tools Specification — Quiz & Topic Generator



Part 1: Dissertation Readiness Quiz

Overview

A scored 10-question quiz. Each question has 3 answer options worth 0, 1, or 2 points. Max score: 20. Three result buckets: Low (0–6), Medium (7–13), High (14–20). Output: personalised result card with score, readiness label, 2-sentence summary, and one recommended next step with CTA button.



Questions & Scoring



Q1: How clearly defined is your dissertation research question?

I don’t have a clear research question yet (0)

I have a general topic but my question still shifts (1)

My research question is clear, focused, and approved by my committee (2)



Q2: How much of your literature review is complete?

I haven’t started or have only a few sources (0)

I have a working draft but it needs significant development (1)

My literature review is substantially complete and reviewed (2)



Q3: How confident are you in your research methodology?

I’m unsure what methodology fits my study (0)

I’ve chosen a methodology but have questions about execution (1)

I’m confident in my methodology and have committee approval (2)



Q4: How is your relationship with your dissertation committee?

I rarely communicate with my committee or feel unsupported (0)

We meet occasionally but communication could be better (1)

I have regular contact and feel aligned with my committee (2)



Q5: How much writing have you completed?

I haven’t written any chapters yet (0)

I have a draft of 1–2 chapters (1)

I have drafts of 3 or more chapters (2)



Q6: How consistent is your dissertation writing practice?

I write rarely or only when I’m under pressure (0)

I write occasionally but struggle to maintain momentum (1)

I have a regular writing schedule and mostly stick to it (2)



Q7: How would you describe your current timeline to completion?

I have no clear timeline or it feels unrealistic (0)

I have a rough timeline but I’ve already missed milestones (1)

I have a realistic timeline with achievable milestones (2)



Q8: How is your data collection or analysis progressing?

I haven’t started data collection or analysis (0)

I’m in progress but facing challenges (1)

My data collection is complete and analysis is underway or done (2)



Q9: How do you feel when you sit down to work on your dissertation?

Overwhelmed, avoidant, or paralysed most of the time (0)

Mixed — some productive days, some stuck days (1)

Generally focused and clear on what I need to do (2)



Q10: Have you had any formal support (coaching, editing, or consultation) for your dissertation?

No, I’ve been working entirely on my own (0)

Some informal support but nothing structured (1)

Yes, I have or have had structured support (2)





Result Cards



Low Readiness — Score 0–6



Title

You’re in the early stages — and that’s okay.

Summary

Your responses suggest you’re still building the foundations of your dissertation. The most important step right now is getting structured support to clarify your research direction and build momentum.

Recommended Service

Dissertation Strategy Session — $250

CTA

Book a Strategy Session



Medium Readiness — Score 7–13



Title

You’re further along than you think — but you need a plan.

Summary

You have real progress and a foundation to build on. What’s holding you back is structure, momentum, or a gap in a specific area. The right support will accelerate you significantly.

Recommended Service

Dissertation Success Package — $1,200

CTA

Start the Success Package



High Readiness — Score 14–20



Title

You’re close. Let’s get you across the finish line.

Summary

Your responses show strong progress and clarity. A targeted editing and coaching engagement will take you from nearly there to defended. Don’t slow down now.

Recommended Service

90-Day Dissertation Completion Program — $3,997

CTA

Enroll in the 90-Day Program



Part 2: Dissertation Topic Generator

Overview

A 5-step guided form that collects structured input from the user, then sends a prompt to the AI API (Claude or GPT-4o via FastAPI endpoint) and returns 3 dissertation topic suggestions. Each suggestion includes: a full dissertation title, a one-sentence rationale, and a methodology tag.



Step-by-Step Form



Step 1: Field of Study

Question

What is your academic field?

Input Type

Dropdown

Education

Business & Management

Psychology

Nursing & Healthcare

Public Policy & Administration

Social Work

Criminal Justice

Communications & Media

Technology & Information Systems

Other (please specify — open text)



Step 2: Research Interest

Question

Describe your research interest in one or two sentences.

Input Type

Open text field, max 200 characters

Placeholder

e.g. I’m interested in how remote work policies affect employee mental health in higher education...



Step 3: Population or Context

Question

Who or what is your study focused on?

Input Type

Dropdown

K–12 students or educators

Higher education / college students

Healthcare workers or patients

Nonprofit or community organisations

Corporate or private sector employees

Government or public sector

Underserved or marginalised communities

Other (please specify)



Step 4: Methodology Preference

Question

Do you have a methodology preference?

Input Type

Dropdown

Qualitative (interviews, focus groups, case study)

Quantitative (surveys, statistical analysis)

Mixed Methods (both qualitative and quantitative)

I’m not sure yet — suggest what fits



Step 5: Generate

Button Label

Generate My Topics

Loading Message

Generating your personalised dissertation topics…



AI Prompt Template

⚠ This is the exact prompt to send to the AI API. Inject user inputs into the [BRACKETS].



You are an expert academic dissertation advisor. A doctoral student has provided the following information:

Field of Study: [FIELD]

Research Interest: [INTEREST]

Population / Context: [POPULATION]

Methodology Preference: [METHODOLOGY]



Generate exactly 3 dissertation topic suggestions. For each topic, provide:

1. A full, well-formed dissertation title (specific, researchable, academic in tone)

2. A one-sentence rationale explaining why this topic is relevant and significant

3. A methodology tag: one of Qualitative / Quantitative / Mixed Methods



Format your response as JSON only, with no preamble or markdown. Use this exact structure:

[{"title":"...","rationale":"...","methodology":"..."},{"title":"...","rationale":"...","methodology":"..."},{"title":"...","rationale":"...","methodology":"..."}]



Output Card Design

Card Structure (per topic)

Title in bold • Rationale in regular text • Methodology badge (coloured pill label)

Regenerate Button

Generate 3 New Topics

CTA Below Results

Need help developing your topic? Book a Research Consultation — $300



Technical Notes

API call is server-side via FastAPI POST endpoint /api/generate-topics

API key stored in environment variable — never exposed to frontend

Request timeout: 30 seconds. Show loading spinner while waiting.

On API error: show friendly message ‘Something went wrong. Please try again.’

Rate limit: max 3 generations per session to prevent abuse

Log inputs and outputs (no PII) for quality monitoring



