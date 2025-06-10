/*
  # Create AtlasHype Database Schema

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text, required)
      - `excerpt` (text, optional)
      - `author` (text, required)
      - `category` (enum: Local, Canada, World, Opinion, Events)
      - `image` (text, optional)
      - `tags` (text array, optional)
      - `featured` (boolean, default false)
      - `published` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp, optional)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `name` (text, required)
      - `role` (text, default 'editor')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access to published articles
    - Add policies for admin access to all data
*/

-- Create article_category enum
CREATE TYPE article_category AS ENUM ('Local', 'Canada', 'World', 'Opinion', 'Events');

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  author text NOT NULL,
  category article_category NOT NULL,
  image text,
  tags text[],
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  published_at timestamptz
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'editor',
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Articles policies
CREATE POLICY "Articles are viewable by everyone"
  ON articles
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Articles are editable by admin users"
  ON articles
  FOR ALL
  TO public
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  );

-- Admin users policies
CREATE POLICY "Admin users are viewable by other admin users"
  ON admin_users
  FOR SELECT
  TO public
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users
    )
  );

-- Insert your admin user
INSERT INTO admin_users (email, name, role)
VALUES ('kxpiyush@gmail.com', 'Piyush Kumar', 'admin')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role;

-- Insert some sample articles for testing
INSERT INTO articles (title, slug, content, excerpt, author, category, featured, published, published_at)
VALUES 
  (
    'Welcome to AtlasHype - Your Source for Canadian News',
    'welcome-to-atlashype-canadian-news',
    'AtlasHype is your premier destination for comprehensive coverage of Canadian news, from local Toronto stories to national politics and international affairs that impact Canada. Our dedicated team of journalists brings you accurate, timely, and insightful reporting on the issues that matter most to Canadians.

We cover a wide range of topics including local Toronto news, Canadian politics, world events, opinion pieces from expert columnists, and upcoming events across the country. Our mission is to keep you informed and engaged with the stories that shape our communities and our nation.

Stay tuned for breaking news, in-depth analysis, and exclusive interviews with key figures in Canadian politics, business, and culture.',
    'AtlasHype launches as your premier source for Canadian news, covering everything from local Toronto stories to national politics.',
    'Piyush Kumar',
    'Local',
    true,
    true,
    CURRENT_TIMESTAMP
  ),
  (
    'Toronto City Council Approves New Housing Development Plan',
    'toronto-city-council-housing-development-plan',
    'Toronto City Council has unanimously approved a comprehensive housing development plan aimed at addressing the city''s ongoing affordability crisis. The plan includes provisions for 50,000 new affordable housing units over the next five years.

Mayor Olivia Chow praised the decision, stating that this represents a significant step forward in making Toronto more livable for all residents. The plan includes a mix of rental units, condominiums, and social housing options distributed across all city wards.

The development will be funded through a combination of federal, provincial, and municipal resources, with additional support from private developers who will be required to include affordable units in their projects.',
    'Toronto City Council unanimously approves ambitious housing plan to create 50,000 affordable units over five years.',
    'Sarah Chen',
    'Local',
    false,
    true,
    CURRENT_TIMESTAMP
  ),
  (
    'Canada Announces New Climate Action Framework',
    'canada-new-climate-action-framework',
    'The federal government has unveiled an ambitious new climate action framework that aims to position Canada as a global leader in the fight against climate change. The comprehensive plan includes significant investments in renewable energy, carbon capture technology, and green infrastructure.

Prime Minister Justin Trudeau announced the framework during a press conference in Ottawa, emphasizing Canada''s commitment to achieving net-zero emissions by 2050. The plan includes $15 billion in new funding over the next decade.

Key components of the framework include accelerated deployment of wind and solar energy projects, support for electric vehicle adoption, and investments in clean technology research and development.',
    'Federal government unveils comprehensive climate action framework with $15 billion investment over next decade.',
    'Michael Rodriguez',
    'Canada',
    true,
    true,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (slug) DO NOTHING;