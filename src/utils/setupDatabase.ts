import { supabase } from '../lib/supabase'

export const setupDatabase = async () => {
  try {
    // Create articles table
    const { error: articlesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS articles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          excerpt TEXT,
          author TEXT NOT NULL,
          category TEXT NOT NULL CHECK (category IN ('Local', 'Canada', 'World', 'Opinion', 'Events')),
          image TEXT,
          tags TEXT[],
          featured BOOLEAN DEFAULT FALSE,
          published BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          published_at TIMESTAMP WITH TIME ZONE
        );
      `
    })

    // Create admin_users table
    const { error: adminError } = await supabase.rpc('exec_sql', {
      sql: `
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
        CREATE POLICY "Service role can access admin users" ON admin_users
          FOR ALL USING (true);
      `
    })

    // Insert default admin user
    const { error: insertError } = await supabase
      .from('admin_users')
      .upsert([
        {
          email: 'admin@atlashype.com',
          password_hash: '$2a$10$rOvHPDNF7RjqmQZ8g7Sk3eY4XQ9JjXvKpEq1mJv7fJ8wF2Q6L4u8G',
          name: 'AtlasHype Admin',
          role: 'admin'
        }
      ], { onConflict: 'email' })

    console.log('Database setup completed!')
    return { success: true }
  } catch (error) {
    console.error('Database setup failed:', error)
    return { success: false, error }
  }
}