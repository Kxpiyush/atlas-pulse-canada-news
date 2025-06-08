
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvxijaqscodnlqnxtcza.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eGlqYXFzY29kbmxxbnh0Y3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTQ1OTcsImV4cCI6MjA2NDk3MDU5N30.h1PAeRYYVAeW35xHVNf9x9m6v61BC-nEhurOKUlD_0U'

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
