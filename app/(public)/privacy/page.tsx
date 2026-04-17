export default function PrivacyPage() {
    return (
      <div className="container py-12 md:py-24 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p>We log your name, email, and billing details when you purchase a service or fill out our contact and upload forms. We use Stripe for secure payment processing and Supabase to secure your data and uploaded files.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p>We use your information exclusively to deliver the academic coaching and editing services you have purchased. We do not sell your data to third parties.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
        <p>All manuscript uploads are stored on secure servers with Row-Level Security ensuring only you and your assigned coach can access your documents.</p>
      </div>
    )
  }
