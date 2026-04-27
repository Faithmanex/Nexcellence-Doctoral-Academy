-- Modify contact_submissions to include payment_status to align with the new application flow

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed'));

-- Since this is just a dummy payment simulation for now, "completed" will be the usual state
-- after the simulation.

-- Add a comment to remember what this does
COMMENT ON COLUMN contact_submissions.payment_status IS 'Tracks the payment status of checkout applications.';
