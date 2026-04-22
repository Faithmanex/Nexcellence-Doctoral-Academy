-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name text,
  email text,
  role text DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  enrolled_service text,
  next_steps jsonb DEFAULT '[]'::jsonb,
  calendly_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Milestones table
CREATE TABLE milestones (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'complete')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at timestamp with time zone
);

-- Coach notes table
CREATE TABLE coach_notes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Documents table
CREATE TABLE documents (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  filename text NOT NULL,
  storage_path text NOT NULL,
  service_type text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'returned', 'approved')),
  uploaded_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Upload tokens table
CREATE TABLE upload_tokens (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  token uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  service_type text NOT NULL,
  used boolean DEFAULT false,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  role_type text,
  interested_in text,
  message text,
  source text,
  handled boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'system_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Profiles: users can read and update only their own row; admins can do all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR is_admin());
CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT WITH CHECK (is_admin());

-- Milestones: users read own; admins all
CREATE POLICY "Users can view own milestones" ON milestones FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Admins can manage milestones" ON milestones FOR ALL USING (is_admin());

-- Coach notes: users read own; admins all
CREATE POLICY "Users can view own notes" ON coach_notes FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Admins can manage notes" ON coach_notes FOR ALL USING (is_admin());

-- Documents: users read own, insert own; admins all
CREATE POLICY "Users can view own documents" ON documents FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage documents" ON documents FOR ALL USING (is_admin());

-- Upload tokens: users read own; admins all
CREATE POLICY "Users can view own tokens" ON upload_tokens FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Admins can manage tokens" ON upload_tokens FOR ALL USING (is_admin());

-- Contact: anyone insert; admins read/update
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (is_admin());
CREATE POLICY "Admins can manage contact submissions" ON contact_submissions FOR UPDATE USING (is_admin());

-- Automated Profile Creation from Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), 
    'client'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
