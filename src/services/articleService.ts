
import { supabase } from '../lib/supabase'

// Import and re-export the Article type from supabase
export type { Article } from '../lib/supabase'
import type { Article } from '../lib/supabase'

// Fallback storage for when Supabase is not working
const FALLBACK_STORAGE_KEY = 'atlashype_articles'

const getFallbackArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(FALLBACK_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveFallbackArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(articles))
  } catch (error) {
    console.error('Failed to save articles to fallback storage:', error)
  }
}

const generateId = (): string => {
  return 'article_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export const articleService = {
  // Get all published articles
  async getPublishedArticles(): Promise<Article[]> {
    try {
      console.log('Attempting to fetch published articles from Supabase...')
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) throw error
      console.log('Successfully fetched articles from Supabase:', data?.length || 0)
      return data || []
    } catch (error) {
      console.log('Supabase fetch failed, using fallback storage:', error)
      const fallbackArticles = getFallbackArticles()
      return fallbackArticles.filter(article => article.published)
    }
  },

  // Get articles by category
  async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.log('Supabase fetch by category failed, using fallback storage:', error)
      const fallbackArticles = getFallbackArticles()
      return fallbackArticles.filter(article => article.published && article.category === category)
    }
  },

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.log('Supabase fetch by slug failed, using fallback storage:', error)
      const fallbackArticles = getFallbackArticles()
      return fallbackArticles.find(article => article.slug === slug && article.published) || null
    }
  },

  // Get featured articles
  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('featured', true)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(5)

      if (error) throw error
      return data || []
    } catch (error) {
      console.log('Supabase fetch featured failed, using fallback storage:', error)
      const fallbackArticles = getFallbackArticles()
      return fallbackArticles.filter(article => article.featured && article.published).slice(0, 5)
    }
  },

  // Admin: Get all articles (including unpublished)
  async getAllArticles(): Promise<Article[]> {
    try {
      console.log('Attempting to fetch all articles from Supabase...')
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      console.log('Successfully fetched all articles from Supabase:', data?.length || 0)
      return data || []
    } catch (error) {
      console.log('Supabase fetch all failed, using fallback storage:', error)
      return getFallbackArticles()
    }
  },

  // Admin: Create article
  async createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    try {
      console.log('Attempting to create article in Supabase:', article.title)
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()
        .single()

      if (error) throw error
      console.log('Successfully created article in Supabase:', data.id)
      return data
    } catch (error) {
      console.log('Supabase create failed, using fallback storage:', error)
      
      // Create article in fallback storage
      const newArticle: Article = {
        ...article,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const existingArticles = getFallbackArticles()
      const updatedArticles = [newArticle, ...existingArticles]
      saveFallbackArticles(updatedArticles)
      
      console.log('Article created in fallback storage:', newArticle.id)
      return newArticle
    }
  },

  // Admin: Update article
  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    try {
      console.log('Attempting to update article in Supabase:', id)
      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      console.log('Successfully updated article in Supabase:', data.id)
      return data
    } catch (error) {
      console.log('Supabase update failed, using fallback storage:', error)
      
      // Update article in fallback storage
      const existingArticles = getFallbackArticles()
      const articleIndex = existingArticles.findIndex(article => article.id === id)
      
      if (articleIndex === -1) {
        throw new Error('Article not found')
      }
      
      const updatedArticle = {
        ...existingArticles[articleIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      existingArticles[articleIndex] = updatedArticle
      saveFallbackArticles(existingArticles)
      
      console.log('Article updated in fallback storage:', updatedArticle.id)
      return updatedArticle
    }
  },

  // Admin: Delete article
  async deleteArticle(id: string): Promise<void> {
    try {
      console.log('Attempting to delete article in Supabase:', id)
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error
      console.log('Successfully deleted article in Supabase:', id)
    } catch (error) {
      console.log('Supabase delete failed, using fallback storage:', error)
      
      // Delete article from fallback storage
      const existingArticles = getFallbackArticles()
      const filteredArticles = existingArticles.filter(article => article.id !== id)
      saveFallbackArticles(filteredArticles)
      
      console.log('Article deleted from fallback storage:', id)
    }
  },

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}
