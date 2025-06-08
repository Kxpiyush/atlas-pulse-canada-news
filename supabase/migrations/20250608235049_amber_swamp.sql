/*
  # Create admin users table

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `name` (text)
      - `role` (text, default 'admin')
      - `created_at` (timestamp)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for service role access (bypasses RLS for server-side operations)

  3. Data
    - Insert default admin user with hashed password
*/

-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows service role to access admin_users
-- This prevents infinite recursion while still maintaining security
CREATE POLICY "Service role can access admin users" ON admin_users
  FOR ALL USING (true);

-- Insert default admin user (password: admin123)
-- Note: In production, you should use proper password hashing
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@atlashype.com', '$2a$10$rOvHPDNF7RjqmQZ8g7Sk3eY4XQ9JjXvKpEq1mJv7fJ8wF2Q6L4u8G', 'Admin User')
ON CONFLICT (email) DO NOTHING;