-- Fix for RLS Recursion on profiles table
-- Run this in the Supabase SQL Editor

-- 1. Update is_admin function to be safer and avoid recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Use a query that bypasses RLS by being SECURITY DEFINER and setting search_path
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'system_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Update profiles policies to be non-recursive
-- We drop and recreate them to ensure they are clean
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles 
FOR SELECT USING (is_admin());

-- 3. Ensure other policies also use the fixed is_admin() correctly
-- (These are already in schema.sql but repeated here for completeness in the fix)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles 
FOR UPDATE USING (auth.uid() = id OR is_admin());

DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
CREATE POLICY "Admins can insert profiles" ON profiles 
FOR INSERT WITH CHECK (is_admin());
