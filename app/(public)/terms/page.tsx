export default function TermsPage() {
    return (
      <div className="container py-12 md:py-24 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Service Agreement</h2>
        <p>By purchasing a service from Nexcellence Academy™, you agree to participate fully in the coaching process. We provide strategic guidance and editing, but we do not write your dissertation or academic papers for you in violation of academic integrity policies.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Refund Policy</h2>
        <p>Due to the digital and time-intensive nature of our consulting services, refunds are generally not provided after services have commenced. Strategy sessions must be canceled or rescheduled 24 hours in advance.</p>
      </div>
    )
  }
