-- =====================================================
-- SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- 1. Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stripe_checkout_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_customer_email TEXT NOT NULL,
  has_course BOOLEAN DEFAULT FALSE,
  has_assessment BOOLEAN DEFAULT FALSE,
  amount_total INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create intake_forms table
CREATE TABLE IF NOT EXISTS intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  income_bracket TEXT NOT NULL CHECK (income_bracket IN (
    'under_30k', '30k_50k', '50k_75k', '75k_100k', 'over_100k'
  )),
  communication_goal TEXT NOT NULL CHECK (communication_goal IN (
    'ielts_exam', 'general_english', 'professional_business', 'academic'
  )),
  assigned_coach TEXT,
  calendly_link TEXT,
  routing_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create course_access table
CREATE TABLE IF NOT EXISTS course_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  access_granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id)
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Purchases policies
CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Intake forms policies
CREATE POLICY "Users can view own intake forms"
  ON intake_forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert intake forms"
  ON intake_forms FOR INSERT
  WITH CHECK (true);

-- Course access policies
CREATE POLICY "Users can view own course access"
  ON course_access FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
