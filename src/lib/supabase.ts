
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  category: 'Local' | 'Canada' | 'World' | 'Opinion' | 'Events'
  image?: string
  tags?: string[]
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  published_at: string
}

export type AdminUser = {
  id: string
  email: string
  name: string
  role: string
}
