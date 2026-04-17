Nexcellence Academy™
Admin Dashboard — Full Specification

Route /admin (protected — redirect to /login if role ≠ admin)
Access Accounts where profiles.role = 'admin' only. Never expose to clients.
Auth Same Supabase Auth session as client. Role check on every page load via profiles.role.
Purpose Coach view for managing all clients — creating accounts, updating milestones, posting notes, managing documents, tracking payments.

1. Admin Login & Role Guard
   • Admin uses the same /login page as clients
   • On successful login: fetch profiles.role for the authenticated user
   • If role = 'admin': redirect to /admin
   • If role = 'client': redirect to /client-dashboard
   • If /admin is accessed directly without role = 'admin': redirect to /login
   • Never show the admin route in any client-facing navigation

2. Admin Home — Overview
   Route
   /admin
   Heading
   Coach Dashboard

Summary Cards (top of page)
Card Query Purpose
Active Clients COUNT(_) FROM profiles WHERE role = 'client' Total enrolled clients
Documents Pending COUNT(_) FROM documents WHERE status = 'pending' Needs review
Documents Under Review COUNT(_) FROM documents WHERE status = 'under_review' In progress
New Contact Submissions COUNT(_) FROM contact_submissions WHERE created_at > now() - interval '7 days' Last 7 days

Recent Activity Feed
Below summary cards: a reverse-chronological feed of the last 20 events across all clients.
Event type Display text Timestamp source
New document uploaded [Client name] uploaded [filename] for [service_type] documents.uploaded_at
Document status changed [Client name]’s [filename] marked as [status] documents.updated_at
New contact submission [Name] submitted a contact form — interested in [service] contact_submissions.created_at
New client created Client account created for [name] profiles.created_at

3. Client List
   Route
   /admin/clients
   Layout
   Searchable, sortable table of all clients.

Table Columns
Column Source Notes
Full Name profiles.full_name Clickable — links to /admin/clients/[id]
Email profiles.email Display only
Enrolled Service profiles.enrolled_service Text badge
Documents COUNT from documents Number of submitted docs
Pending Milestones COUNT from milestones WHERE status = pending Quick health indicator
Joined profiles.created_at Formatted date
Actions Edit • View Dashboard Icon buttons

Filters
• Search by name or email (client-side filter)
• Filter by enrolled service (dropdown)
• Filter by join date range

Create New Client Button
'+ Add Client' button in top-right corner. Opens the Create Client modal (see Section 5).

4. Client Detail Page
   Route
   /admin/clients/[id]
   Layout
   Full client view. All sections editable by admin.

4a. Client Header
• Full name (editable inline)
• Email (display only — edit via Supabase Auth if needed)
• Enrolled service (editable dropdown)
• Join date (display only)
• Role badge (always shows 'Client')
• 'View Client Dashboard' button — opens /client-dashboard impersonation view (read-only preview of what client sees)
• 'Send Upload Link' button — generates a new upload token and sends email via Resend

4b. Milestones Panel
Section heading
Milestones
Layout
Editable vertical timeline.

Admin Controls per Milestone
Action Behaviour Position
Toggle status Checkbox or toggle. Switches between pending ↔ complete. Auto-sets completed_at = now() on complete. Inline
Edit title Click to edit milestone title inline. Save on blur or Enter. Inline
Delete Trash icon. Confirm before delete. Inline

Add Milestone
• '+ Add Milestone' button below the list
• Inline text input appears at bottom of list
• Press Enter or click 'Add' to save: INSERT INTO milestones (user_id, title, status) VALUES ([id], [title], 'pending')
• New milestone appears immediately in list
⚠ Milestone order is determined by created_at ASC. No drag-to-reorder required in v1.

4c. Coach Notes Panel
Section heading
Coach Notes
Layout
Card list, newest first. Admin can add, edit, and delete.

Add Note
• Textarea at top of panel with 'Post Note' button
• On submit: INSERT INTO coach_notes (user_id, content) VALUES ([id], [content])
• New note appears immediately at top of list
• Client sees this note immediately on their next dashboard load

Edit / Delete Existing Note
• Each note card has an Edit pencil icon and Delete trash icon
• Edit: replaces card with textarea pre-filled with existing content. Save updates the row. Cancel restores the card.
• Delete: confirm dialog before DELETE FROM coach_notes WHERE id = [note_id]

4d. Next Steps Panel
Section heading
Next Steps
Layout
Ordered editable list. Admin writes; client reads.
• '+ Add Step' button appends a new text input to the list
• Each step has a drag handle (for reordering), edit icon, and delete icon
• Saved as JSONB array in profiles.next_steps: [{text: '...', order: 0}, ...]
• On save: UPDATE profiles SET next_steps = [array] WHERE id = [id]

4e. Documents Panel
Section heading
Documents
Layout
Table of all documents submitted by this client.

Column Type Notes
Filename Text Display only
Service Type Text Display only
Status Editable dropdown pending → under_review → returned. On change: UPDATE documents SET status = [value] WHERE id = [doc_id]. Triggers email to client if status = 'returned'.
Uploaded Date Display only
Download Button Generates signed Supabase Storage URL. Expires after 60 minutes.
Delete Icon Confirm before delete. Removes from storage and documents table.

Returned Document Email
When admin sets status to 'returned': automatically send 'upload-received-returned' email via Resend to the client with subject: 'Your document is ready — [filename]' and a link to their dashboard.
⚠ This email template must be created in Resend before go-live. See NDA_TechSpec.docx Section 6.

4f. Session Booking Links
Section heading
Booking Links
Layout
Per-client Calendly URL field.
• Single text input for Calendly link specific to this client (or use default per service type)
• This URL is used in the client’s Action Panel 'Book Your Next Session' button
• If blank: fall back to the global Calendly URL for their enrolled_service

5. Create Client
   Trigger
   '+ Add Client' button on /admin/clients
   Layout
   Modal overlay with a short form.

Form Fields
Field Type Notes
Full Name Text input required
Email Address Email input required — used to create Supabase Auth user
Enrolled Service Dropdown (all service names from v4 Content doc) required
Send Welcome Email Checkbox (default: checked) If checked: sends payment-confirmation email via Resend on account creation

On Submit

1. Call Supabase Admin API: supabase.auth.admin.createUser({ email, email_confirm: true, password: auto-generated })
2. INSERT INTO profiles (id, full_name, email, role, enrolled_service) VALUES (new_user.id, ...)
3. If 'Send Welcome Email' checked: trigger Resend 'payment-confirmation' template
4. Send password reset email so client sets their own password: supabase.auth.admin.generateLink({ type: 'recovery', email })
5. On success: close modal, redirect to /admin/clients/[new_id]
6. On error: show inline error. Do not close modal.

7. Documents Hub
   Route
   /admin/documents
   Purpose
   Global view of all documents across all clients. For quick triage without opening each client page.

Table Columns
Column Source Notes
Client Name profiles.full_name Links to /admin/clients/[id]
Filename documents.filename Display only
Service Type documents.service_type Display only
Status Editable dropdown Same behaviour as client detail panel
Uploaded documents.uploaded_at Formatted date
Download Button Signed Supabase Storage URL

Filters
• Filter by status: All / Pending / Under Review / Returned
• Filter by service type (dropdown)
• Sort by uploaded date (default: newest first)

7. Contact Submissions
   Route
   /admin/contacts
   Purpose
   View all contact form submissions. Convert to clients from here.

Table Columns
Column Source Notes
Name contact_submissions.name Display only
Email contact_submissions.email Clickable mailto
Role contact_submissions.role_type e.g. Doctoral Student, Faculty Member
Interested In contact_submissions.interested_in Service category
Message contact_submissions.message Truncated with expand-on-click
Source contact_submissions.source How they found us
Date contact_submissions.created_at Formatted date
Actions Convert to Client • Mark Handled Buttons

Convert to Client
'Convert to Client' button pre-fills the Create Client modal with the submission's name, email, and interested_in field. Admin completes and submits.

Mark Handled
Sets a 'handled' boolean on the submission row. Handled submissions can be filtered out of the default view.

8. Upload Token Management
   Route
   /admin/clients/[id] — within the Documents panel
   Purpose
   Generate and send upload links to clients after payment.

Generate Upload Token Flow 7. Admin clicks 'Send Upload Link' on the client detail page 8. Server generates a UUID token: INSERT INTO upload_tokens (user_id, token, service_type, used, expires_at) VALUES ([id], uuid_generate_v4(), [service], false, now() + interval '72 hours') 9. Trigger Resend 'upload-link' email to client with the unique URL: /upload?token=[token] 10. Show confirmation: 'Upload link sent to [email]. Expires in 72 hours.'

Token Status View
In the Documents panel, show a small table of the client's upload tokens:
Token Generated Status Action
abc123… Jan 15, 2025 Active — expires Jan 18 Revoke button
def456… Jan 10, 2025 Expired Jan 13 —
ghi789… Jan 5, 2025 Used Jan 6 —
⚠ This is a display-only example of the token table structure, not real data.

9. Admin Navigation
   Layout
   Left sidebar on desktop, hamburger drawer on mobile.

Nav Item Route Purpose
Overview /admin Summary cards and activity feed
Clients /admin/clients Full client list and search
Documents /admin/documents All documents across all clients
Contact Submissions /admin/contacts All contact form submissions
Log Out — Calls supabase.auth.signOut(), redirects to /login

10. Permissions Matrix
    Action Client Admin
    View own profile Yes No
    View other client profiles No Yes
    Edit milestones No Yes
    Post coach notes No Yes
    Edit next steps No Yes
    View own documents Yes Yes
    View all documents No Yes
    Update document status No Yes
    Download documents No Yes (signed URL)
    Generate upload tokens No Yes
    Create client accounts No Yes
    View contact submissions No Yes
    Access /admin No Yes
    Access /client-dashboard Yes Yes (preview mode)

11. Security Notes
    • All Supabase queries go through RLS — clients cannot access other clients' data even if they manipulate the client-side query
    • The service role key (SUPABASE_SERVICE_ROLE_KEY) is never exposed to the frontend — used only in server-side API routes
    • Admin role is set in the profiles table. It is never derived from the frontend or from a URL parameter.
    • Upload token validation is server-side: /upload?token=[x] calls an API route that checks the token against the database before rendering the upload form
    • Signed Supabase Storage URLs expire after 60 minutes. Never use public bucket URLs for client documents.
    • All admin actions that write to the database are logged with admin_id and timestamp in an audit_log table (optional for v1 — recommended post-launch)
    • Password reset links expire after 1 hour (Supabase default). Do not extend this.
