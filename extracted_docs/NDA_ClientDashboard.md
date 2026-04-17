Nexcellence Academy™
Client Dashboard — Full Specification

Route /client-dashboard (protected — redirect to /login if no valid Supabase JWT)
Access Enrolled clients only. Provisioned manually at launch; auto-provisioned via Stripe webhook post-launch.
Auth Supabase Auth — JWT stored in httpOnly cookie via Supabase SSR client
Data source Supabase PostgreSQL — all queries filtered by RLS (user sees only their own rows)

1. Login Page
   Route
   /login
   Headline
   Welcome Back.
   Subheadline
   Log in to access your progress tracker, coach notes, document status, and session links.

Form Fields
Field Type Behaviour
Email address email input required
Password password input with show/hide toggle required
Log In primary submit button triggers Supabase signInWithPassword()
Forgot your password? text link routes to /forgot-password
Not a client yet? text + link links to /contact with ref=dashboard

Auth Flow
• On submit: call supabase.auth.signInWithPassword({ email, password })
• On success: redirect to /client-dashboard
• On error: display inline error message below the form — do not clear the email field
• Error messages: 'Invalid email or password.' (generic — do not specify which field is wrong)
• Loading state: disable button and show spinner during auth request

Magic Link (Alternative Login)
• Below the form: 'Prefer a magic link? Send me a login link instead.'
• On click: call supabase.auth.signInWithOtp({ email })
• Show: 'Check your email for a login link. It expires in 10 minutes.'
• Magic link redirects to /client-dashboard on click

Forgot Password
Route
/forgot-password
• Single email input field
• On submit: call supabase.auth.resetPasswordForEmail(email, { redirectTo: '/reset-password' })
• Show: 'If an account exists for that email, you’ll receive a reset link shortly.'
• Do not confirm whether the email exists

2. Dashboard Home
   Route
   /client-dashboard
   Welcome message
   Welcome back, [profiles.full_name]. Here’s where things stand.

Data Fetched on Load
Table Query Used for
profiles SELECT full_name, enrolled_service, role FROM profiles WHERE id = auth.uid() User greeting and enrolled service label
milestones SELECT title, status, completed_at FROM milestones WHERE user_id = auth.uid() ORDER BY created_at ASC Progress tracker
documents SELECT filename, service_type, status, uploaded_at FROM documents WHERE user_id = auth.uid() ORDER BY uploaded_at DESC Document status table
coach_notes SELECT content, created_at FROM coach_notes WHERE user_id = auth.uid() ORDER BY created_at DESC LIMIT 5 Coach notes panel
upload_tokens SELECT token, expires_at, used FROM upload_tokens WHERE user_id = auth.uid() AND used = false AND expires_at > now() LIMIT 1 Active upload link

3. Dashboard Sections
   3a. Header Bar
   • Logo (left) — links to home page
   • Welcome message: 'Welcome back, [First Name]'
   • Enrolled service badge: pill label showing enrolled_service (e.g. '90-Day Program')
   • Log Out button (right) — calls supabase.auth.signOut(), redirects to /login

3b. Progress Milestones
Section heading
Your Milestones
Layout
Vertical timeline. Each milestone is a row with a status indicator on the left rail.

Status value Visual indicator Meaning
pending Grey circle outline Milestone not yet reached
complete Filled navy circle with checkmark Milestone completed

Milestone Data
Each row renders: status indicator • milestone title • completion date (if status = complete, show 'Completed [date]'; if pending, show nothing)
⚠ Milestones are created and updated by the admin only. Clients cannot edit milestones.

Empty State
'Your milestones will appear here once your engagement begins. If you’ve just enrolled, check back within 1 business day.'

3c. Document Status
Section heading
Your Documents
Layout
Table with 4 columns.

Column Type Notes
filename Text name of uploaded file
service_type Text e.g. Chapter Edit, Proposal Editing
status Coloured badge pending = grey • under_review = amber • returned = green
uploaded_at Date formatted as Month D, YYYY

Status Badge Copy
Status value Badge label Colour
pending Awaiting review Grey
under_review Under review Amber
returned Returned — check your email Green

Empty State
'No documents submitted yet. Upload your first document using the button below.'

3d. Coach Notes
Section heading
Notes from Dr. Triplett
Layout
Card list, newest first. Max 5 shown. 'View all notes' link if more than 5 exist.
Card content
Note body text • date posted (formatted as Month D, YYYY)
Styling
Left border accent in navy. Background light gray. Read-only — no edit or reply controls shown to client.

Empty State
'Dr. Triplett hasn’t posted any notes yet. Notes will appear here after your first session.'

3e. Next Steps
Section heading
Your Next Steps
Layout
Ordered list. Admin-authored. Read-only for client.
Source
next_steps column in profiles table (text array or JSONB). Admin sets these per client.

Empty State
'Your next steps will be added after your first session with Dr. Triplett.'

3f. Action Panel
Layout
Two-button row, sticky at the bottom of the dashboard on mobile.

Button Behaviour Style
Submit a Document Links to /upload with active token appended as query param. If no active token: show 'No active upload link. Contact us to request one.' with a mailto link. Primary button
Book Your Next Session Links to Calendly booking URL (set per enrolled_service in admin) Secondary outlined button

4. Mobile Layout
   • Header bar: logo left, hamburger menu right (contains Log Out)
   • Sections stack vertically in this order: Welcome → Next Steps → Milestones → Documents → Coach Notes → Action Panel
   • Action Panel: full-width stacked buttons, fixed to bottom of viewport on mobile
   • Milestones: left rail indicator stays visible; title wraps to 2 lines if needed
   • Document table: collapses to card-per-row on mobile (filename + status badge + date)
   • Coach notes: full-width cards, no truncation

5. States & Error Handling
   State Behaviour
   Loading Show skeleton loaders for each section while Supabase queries resolve. Do not block the entire page.
   No data (any section) Show the empty state copy defined in Section 3 for that panel.
   Supabase error Show: 'Something went wrong loading your dashboard. Please refresh the page.' Log error to console.
   Session expired Detect 401 from Supabase client, redirect to /login with ?reason=expired in query param. Show: 'Your session has expired. Please log in again.'
   No active upload token Show inline message in Action Panel: 'No active upload link. Contact us.' with mailto.

6. In-Dashboard Notifications
   Optional. If implemented, show a small notification dot on a bell icon in the header when:
   • A document status has changed to 'returned' since the client last logged in
   • New coach notes have been added since last login
   • A new next step has been assigned
   Track 'last seen' timestamp in profiles table. Compare against updated_at on relevant rows.
   ⚠ Treat notifications as a post-launch enhancement. Not required for v1.
