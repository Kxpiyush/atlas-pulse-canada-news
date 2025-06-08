
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

-- Create policy for admin users
CREATE POLICY "Admin users can manage themselves" ON admin_users
  FOR ALL USING (auth.uid() = id);

-- Insert default admin user (password: admin123)
-- Note: In production, you should use proper password hashing
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@atlashype.com', '$2a$10$rOvHPDNF7RjqmQZ8g7Sk3eY4XQ9JjXvKpEq1mJv7fJ8wF2Q6L4u8G', 'Admin User')
ON CONFLICT (email) DO NOTHING;
