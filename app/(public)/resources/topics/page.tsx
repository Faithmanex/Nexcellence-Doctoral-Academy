'use client'

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ArrowRight, BookOpen, Beaker, Eye, GitMerge } from "lucide-react"

const FIELDS = [
  { id: "education", name: "Education", color: "#1e40af" },
  { id: "business", name: "Business", color: "#7c3aed" },
  { id: "psychology", name: "Psychology", color: "#059669" },
  { id: "nursing", name: "Nursing & Healthcare", color: "#dc2626" },
  { id: "publicpolicy", name: "Public Policy", color: "#ea580c" },
  { id: "socialwork", name: "Social Work", color: "#0891b2" }
]

const METHODOLOGY_TAGS = {
  qualitative: { label: "Qualitative", icon: Eye, color: "bg-teal-50 text-teal-700 border-teal-200" },
  quantitative: { label: "Quantitative", icon: Beaker, color: "bg-blue-50 text-blue-700 border-blue-200" },
  mixed: { label: "Mixed Methods", icon: GitMerge, color: "bg-purple-50 text-purple-700 border-purple-200" }
}

const TOPICS = [
  // Education (17 topics)
  { id: 1, field: "education", title: "The Impact of Teacher Professional Development on Student Achievement in Urban Schools", methodology: "quantitative" },
  { id: 2, field: "education", title: "Online Learning Effectiveness: A Comparative Study of Synchronous vs Asynchronous Instruction in Higher Education", methodology: "mixed" },
  { id: 3, field: "education", title: "Parental Engagement Strategies in Title I Schools: Barriers and Facilitators", methodology: "qualitative" },
  { id: 4, field: "education", title: "Culturally Responsive Teaching Practices in Multicultural Classrooms", methodology: "qualitative" },
  { id: 5, field: "education", title: "The Effect of Class Size Reduction on Academic Performance in Primary Education", methodology: "quantitative" },
  { id: 6, field: "education", title: "Technology Integration in K-12 Mathematics Instruction: Teacher Perceptions and Practices", methodology: "mixed" },
  { id: 7, field: "education", title: "Student Retention in Online Doctoral Programs: A Phenomenological Study", methodology: "qualitative" },
  { id: 8, field: "education", title: "Assessment Literacy Among Secondary Teachers: A Mixed Methods Investigation", methodology: "mixed" },
  { id: 9, field: "education", title: "The Role of School Leadership in Turnaround Schools: A Case Study Analysis", methodology: "qualitative" },
  { id: 10, field: "education", title: "Self-Efficacy and Academic Performance in First-Generation College Students", methodology: "quantitative" },
  { id: 11, field: "education", title: "Differentiated Instruction for English Language Learners in Mainstream Classrooms", methodology: "mixed" },
  { id: 12, field: "education", title: "The Influence of School Climate on Teacher Burnout and Retention", methodology: "quantitative" },
  { id: 13, field: "education", title: "Project-Based Learning in STEM Education: Student Outcomes and Engagement", methodology: "mixed" },
  { id: 14, field: "education", title: "Mentoring Programs for At-Risk Youth: An Evaluation Study", methodology: "quantitative" },
  { id: 15, field: "education", title: "Transition from High School to College: Perceptions of Students with Disabilities", methodology: "qualitative" },
  { id: 16, field: "education", title: "Teacher Evaluation Systems and Instructional Improvement", methodology: "qualitative" },
  { id: 17, field: "education", title: "Financial Literacy Education in Secondary Schools: Curriculum and Implementation", methodology: "mixed" },

  // Business (17 topics)
  { id: 18, field: "business", title: "Leadership Styles and Employee Engagement in Remote Work Environments", methodology: "quantitative" },
  { id: 19, field: "business", title: "Corporate Social Responsibility and Consumer Purchase intentions: An Empirical Study", methodology: "quantitative" },
  { id: 20, field: "business", title: "Digital Transformation Strategies in Traditional SMEs: Barriers and Success Factors", methodology: "mixed" },
  { id: 21, field: "business", title: "Employee Turnover in the Hospitality Industry: Causes and Retention Strategies", methodology: "mixed" },
  { id: 22, field: "business", title: "Supply Chain Resilience After COVID-19: Lessons for Manufacturing Firms", methodology: "qualitative" },
  { id: 23, field: "business", title: "Entrepreneurial Intentions Among University Students: Cultural and Social Influences", methodology: "quantitative" },
  { id: 24, field: "business", title: "Work-Life Balance Policies and Women's Career Advancement in Corporate Settings", methodology: "mixed" },
  { id: 25, field: "business", title: "Sustainable Business Practices and Competitive Advantage", methodology: "quantitative" },
  { id: 26, field: "business", title: "Financial Performance of Family Businesses: Succession Planning Effects", methodology: "quantitative" },
  { id: 27, field: "business", title: "Brand Equity in Social Media Marketing: Consumer Trust and Loyalty", methodology: "quantitative" },
  { id: 28, field: "business", title: "International Market Entry Strategies for Emerging Market Firms", methodology: "qualitative" },
  { id: 29, field: "business", title: "Organizational Culture and Innovation Adoption in Technology Companies", methodology: "mixed" },
  { id: 30, field: "business", title: "Financial Literacy and Investment Behavior Among Retail Investors", methodology: "quantitative" },
  { id: 31, field: "business", title: "E-Commerce Adoption in Rural Small Businesses: Technology and Market Access", methodology: "qualitative" },
  { id: 32, field: "business", title: "Strategic Alliances and Competitive Positioning in the Airline Industry", methodology: "qualitative" },
  { id: 33, field: "business", title: "Talent Management in the Gig Economy: Challenges and Opportunities", methodology: "mixed" },
  { id: 34, field: "business", title: "Corporate Governance and Firm Performance in Developing Economies", methodology: "quantitative" },

  // Psychology (17 topics)
  { id: 35, field: "psychology", title: "Trauma-Informed Care in Elementary Schools: Teacher Training and Student Outcomes", methodology: "mixed" },
  { id: 36, field: "psychology", title: "Mindfulness-Based Interventions for Anxiety Reduction in College Students", methodology: "quantitative" },
  { id: 37, field: "psychology", title: "Attachment Styles and Romantic Relationships in Emerging Adults", methodology: "quantitative" },
  { id: 38, field: "psychology", title: "Cognitive Behavioral Therapy Efficacy for Depression in Older Adults", methodology: "quantitative" },
  { id: 39, field: "psychology", title: "Cyberbullying and Mental Health Outcomes in Adolescents", methodology: "mixed" },
  { id: 40, field: "psychology", title: "Parenting Stress and Child Behavior Problems: Mediating Factors", methodology: "quantitative" },
  { id: 41, field: "psychology", title: "Workplace Burnout and Coping Strategies Among Healthcare Professionals", methodology: "mixed" },
  { id: 42, field: "psychology", title: "Self-Compassion and Psychological Well-Being in LGBTQ+ Young Adults", methodology: "quantitative" },
  { id: 43, field: "psychology", title: "Grief and Bereavement Support in Pediatric Palliative Care", methodology: "qualitative" },
  { id: 44, field: "psychology", title: "Emotion Regulation Difficulties in Borderline Personality Disorder", methodology: "qualitative" },
  { id: 45, field: "psychology", title: "Test Anxiety and Academic Performance in High-Stakes Testing", methodology: "quantitative" },
  { id: 46, field: "psychology", title: "Social Media Use and Body Image Concerns Among Young Women", methodology: "mixed" },
  { id: 47, field: "psychology", title: "Resilience Factors in Children of Depressed Parents", methodology: "qualitative" },
  { id: 48, field: "psychology", title: "Executive Function and Academic Achievement in Children with ADHD", methodology: "quantitative" },
  { id: 49, field: "psychology", title: "Stigma and Help-Seeking for Mental Health in Military Populations", methodology: "qualitative" },
  { id: 50, field: "psychology", title: "Play Therapy Efficacy for Children with Autism Spectrum Disorder", methodology: "quantitative" },
  { id: 51, field: "psychology", title: "Discrimination and Psychological Distress in Immigrant Populations", methodology: "mixed" },

  // Nursing & Healthcare (17 topics)
  { id: 52, field: "nursing", title: "Nurse-to-Patient Ratios and Patient Safety Outcomes: A Quantitative Analysis", methodology: "quantitative" },
  { id: 53, field: "nursing", title: "Transitional Care Models for Chronic Disease Management in Elderly Patients", methodology: "mixed" },
  { id: 54, field: "nursing", title: "Burnout and Retention Strategies Among Emergency Department Nurses", methodology: "mixed" },
  { id: 55, field: "nursing", title: "Patient-Centered Care in Rural Health Clinics: Implementation and Outcomes", methodology: "qualitative" },
  { id: 56, field: "nursing", title: "Telehealth Adoption in Primary Care: Barriers and Facilitators", methodology: "mixed" },
  { id: 57, field: "nursing", title: "Medication Adherence in Patients with Multiple Chronic Conditions", methodology: "quantitative" },
  { id: 58, field: "nursing", title: "Nurse Practitioner Autonomy and Job Satisfaction: Practice Environment Influences", methodology: "quantitative" },
  { id: 59, field: "nursing", title: "Prevention of Hospital-Acquired Infections: Hand Hygiene Compliance Strategies", methodology: "quantitative" },
  { id: 60, field: "nursing", title: "Pain Management in Post-Operative Patients: Pharmacological and Non-Pharmacological Approaches", methodology: "mixed" },
  { id: 61, field: "nursing", title: "Health Literacy and Patient Engagement in Chronic Disease Self-Management", methodology: "mixed" },
  { id: 62, field: "nursing", title: "Workplace Violence Against Nurses: Prevalence and Prevention Strategies", methodology: "quantitative" },
  { id: 63, field: "nursing", title: "Maternal Outcomes in Midwife-Led vs Physician-Led Care: A Comparative Study", methodology: "quantitative" },
  { id: 64, field: "nursing", title: "Sepsis Early Detection Protocols in Hospital Settings", methodology: "quantitative" },
  { id: 65, field: "nursing", title: "Cultural Competence in Nursing Care for Diverse Populations", methodology: "qualitative" },
  { id: 66, field: "nursing", title: "Simulation-Based Training for Clinical Competency in Nursing Education", methodology: "quantitative" },
  { id: 67, field: "nursing", title: "Caregiver Burden in Families of Patients with Dementia", methodology: "mixed" },
  { id: 68, field: "nursing", title: "Staffing Models and Quality of Care in Nursing Homes", methodology: "quantitative" },

  // Public Policy (17 topics)
  { id: 69, field: "publicpolicy", title: "Policy Implementation of Universal Pre-K: Lessons from State Initiatives", methodology: "qualitative" },
  { id: 70, field: "publicpolicy", title: "Crime Prevention Through Environmental Design: Policy Effectiveness", methodology: "mixed" },
  { id: 71, field: "publicpolicy", title: "Public Transportation Accessibility for Persons with Disabilities: Policy Evaluation", methodology: "qualitative" },
  { id: 72, field: "publicpolicy", title: "Affordable Housing Policies and Community Development Outcomes", methodology: "mixed" },
  { id: 73, field: "publicpolicy", title: "Immigration Policy Effects on Economic Integration of Refugees", methodology: "quantitative" },
  { id: 74, field: "publicpolicy", title: "Climate Change Adaptation Policies in Coastal Communities", methodology: "mixed" },
  { id: 75, field: "publicpolicy", title: "Welfare Reform and Employment Outcomes for Single Parents", methodology: "quantitative" },
  { id: 76, field: "publicpolicy", title: "Gun Policy Effects on Violent Crime Rates: A Comparative Analysis", methodology: "quantitative" },
  { id: 77, field: "publicpolicy", title: "Local Government Innovation in Digital Service Delivery", methodology: "qualitative" },
  { id: 78, field: "publicpolicy", title: "Food Security Policies and Nutritional Outcomes in Low-Income Populations", methodology: "mixed" },
  { id: 79, field: "publicpolicy", title: "Policing Reform and Community Trust: Policy Implementation Study", methodology: "qualitative" },
  { id: 80, field: "publicpolicy", title: "Renewable Energy Policy Adoption: State-Level Comparative Analysis", methodology: "quantitative" },
  { id: 81, field: "publicpolicy", title: "Public-Private Partnerships in Infrastructure Development: Performance Evaluation", methodology: "mixed" },
  { id: 82, field: "publicpolicy", title: "Voting Access Policies and Electoral Participation", methodology: "quantitative" },
  { id: 83, field: "publicpolicy", title: "Workforce Development Policies and Employment Outcomes", methodology: "mixed" },
  { id: 84, field: "publicpolicy", title: "Substance Abuse Policy and Treatment Access: A Policy Analysis", methodology: "qualitative" },
  { id: 85, field: "publicpolicy", title: "Disaster Preparedness Policies and Community Resilience", methodology: "mixed" },

  // Social Work (17 topics)
  { id: 86, field: "socialwork", title: "Child Welfare Outcomes with Differential Response Models", methodology: "mixed" },
  { id: 87, field: "socialwork", title: "Trauma-Focused CBT with Abused Children: Efficacy Study", methodology: "quantitative" },
  { id: 88, field: "socialwork", title: "Housing First Approach and Chronic Homelessness Reduction", methodology: "quantitative" },
  { id: 89, field: "socialwork", title: "Multisystemic Therapy for Juvenile Delinquency: Program Evaluation", methodology: "mixed" },
  { id: 90, field: "socialwork", title: "Child Protective Services caseload and Worker Retention", methodology: "quantitative" },
  { id: 91, field: "socialwork", title: "Community-Based Mental Health Services for Underserved Populations", methodology: "qualitative" },
  { id: 92, field: "socialwork", title: "Domestic Violence Intervention Programs: Batterer Treatment Effectiveness", methodology: "mixed" },
  { id: 93, field: "socialwork", title: "Aging in Place: Community Support Services for Seniors", methodology: "mixed" },
  { id: 94, field: "socialwork", title: "Immigration Social Services and Acculturation Outcomes", methodology: "qualitative" },
  { id: 95, field: "socialwork", title: "School-Based Social Work and Student Well-Being Outcomes", methodology: "mixed" },
  { id: 96, field: "socialwork", title: "Substance Use Treatment Outcomes in Peer-Led Programs", methodology: "quantitative" },
  { id: 97, field: "socialwork", title: "Foster Care Placement Stability and Child Outcomes", methodology: "quantitative" },
  { id: 98, field: "socialwork", title: "Anti-Poverty Programs and Financial Self-Sufficiency", methodology: "mixed" },
  { id: 99, field: "socialwork", title: "Community Organizing and Policy Change in Low-Income Neighborhoods", methodology: "qualitative" },
  { id: 100, field: "socialwork", title: "Cultural Humility in Clinical Practice with Diverse Clients", methodology: "qualitative" },
  { id: 101, field: "socialwork", title: "Grandparents Raising Grandchildren: Support Needs and Service Utilization", methodology: "mixed" },
  { id: 102, field: "socialwork", title: "Workforce Development for Formerly Incarcerated Individuals", methodology: "qualitative" }
]

function TopicsContent() {
  const searchParams = useSearchParams()
  const initialField = searchParams.get("field") || ""
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState(initialField)
  const [selectedMethodology, setSelectedMethodology] = useState("all")

  const filteredTopics = TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesField = selectedField === "all" || topic.field === selectedField
    const matchesMethodology = selectedMethodology === "all" || topic.methodology === selectedMethodology
    return matchesSearch && matchesField && matchesMethodology
  })

  const getFieldInfo = (fieldId: string) => FIELDS.find(f => f.id === fieldId)

  const getMethodologyTag = (methodology: string) => {
    const tag = METHODOLOGY_TAGS[methodology as keyof typeof METHODOLOGY_TAGS]
    if (!tag) return null
    const Icon = tag.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${tag.color}`}>
        <Icon className="w-3 h-3" />
        {tag.label}
      </span>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/doctoral.png" 
          alt="Dissertation Topics" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Doctoral Academy</h4>
           </div>
           <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">100 Dissertation Topics</h1>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-slate-50 border-b sticky top-0 z-20">
        <div className="container max-w-7xl px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            
            {/* Field Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedField("all")}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                  selectedField === "all" 
                    ? "bg-primary text-white" 
                    : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Fields
              </button>
              {FIELDS.map(field => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    selectedField === field.id 
                      ? "text-white" 
                      : "bg-white border text-slate-600 hover:bg-slate-50"
                  }`}
                  style={selectedField === field.id ? { backgroundColor: field.color } : {}}
                >
                  {field.name}
                </button>
              ))}
            </div>

            {/* Methodology Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={selectedMethodology}
                onChange={(e) => setSelectedMethodology(e.target.value)}
                className="pl-10 pr-8 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary appearance-none cursor-pointer"
              >
                <option value="all">All Methodologies</option>
                <option value="qualitative">Qualitative</option>
                <option value="quantitative">Quantitative</option>
                <option value="mixed">Mixed Methods</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12 container max-w-7xl px-6">
        <div className="mb-6">
          <p className="text-sm text-slate-500">
            Showing {filteredTopics.length} of {TOPICS.length} topics
            {selectedField !== "all" && ` in ${FIELDS.find(f => f.id === selectedField)?.name}`}
          </p>
        </div>
        
        {filteredTopics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map(topic => {
              const fieldInfo = getFieldInfo(topic.field)
              return (
                <div 
                  key={topic.id} 
                  className="bg-white elevated-card p-6 group hover:border-secondary transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                      style={{ backgroundColor: fieldInfo?.color + '20', color: fieldInfo?.color }}
                    >
                      {fieldInfo?.name}
                    </span>
                    {getMethodologyTag(topic.methodology)}
                  </div>
                  <h3 className="font-semibold text-primary leading-tight mb-4 group-hover:text-secondary transition-colors">
                    {topic.title}
                  </h3>
                  <Link href="/apply">
                    <Button variant="ghost" className="w-full justify-between text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-secondary">
                      Explore <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-white elevated-card">
            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-serif italic mb-4">No topics found matching your criteria</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedField("all"); setSelectedMethodology("all"); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container max-w-4xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">
            Need a Custom Dissertation Topic?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our AI-powered Topic Generator creates personalized dissertation topics tailored to your field, 
            research interests, and methodology preferences.
          </p>
          <Link href="/resources/generator">
            <Button className="bg-secondary text-primary font-bold uppercase tracking-widest rounded-none h-14 px-8 border-b-4 border-[#c2820a]">
              Generate Your Topics
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[40vh] bg-[#0a192f] flex items-end">
        <div className="container relative z-10 pb-12">
          <div className="h-[2px] w-12 bg-secondary mb-4" />
          <div className="h-8 w-48 bg-white/20 rounded animate-pulse" />
        </div>
      </section>
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white p-6 shadow-sm">
              <div className="h-6 w-24 bg-gray-100 rounded mb-3 animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded mb-2 animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-4 animate-pulse" />
              <div className="h-8 w-full bg-gray-50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function TopicsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <TopicsContent />
    </Suspense>
  )
}