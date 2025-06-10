import { supabase } from '../lib/supabase'

// Import and re-export the Article type from supabase
export type { Article } from '../lib/supabase'
import type { Article } from '../lib/supabase'

// Fallback storage for when Supabase is not working
const FALLBACK_STORAGE_KEY = 'atlashype_articles'

// Sample articles for fallback storage
const sampleArticles: Article[] = [
  {
    id: 'sample_1',
    title: 'Toronto City Council Approves New Transit Expansion Plan',
    slug: 'toronto-transit-expansion-plan',
    content: 'Toronto City Council has unanimously approved a comprehensive transit expansion plan that will see new subway lines and bus rapid transit routes across the Greater Toronto Area. The $15 billion investment represents the largest transit expansion in the city\'s history.\n\nThe plan includes three new subway lines connecting underserved communities to downtown Toronto, as well as dedicated bus lanes on major arterial roads. Construction is expected to begin in 2025, with the first phase completed by 2030.\n\nMayor Olivia Chow praised the council\'s decision, stating that this investment will reduce commute times and improve quality of life for millions of residents. The project is expected to create over 50,000 jobs during the construction phase.',
    excerpt: 'City Council unanimously approves $15 billion transit expansion plan, the largest in Toronto\'s history.',
    author: 'Sarah Johnson',
    category: 'Local',
    image: 'photo-1544620347-c4fd4a3d5957',
    tags: ['transit', 'toronto', 'infrastructure', 'politics'],
    featured: true,
    published: true,
    created_at: '2024-06-08T10:00:00Z',
    updated_at: '2024-06-08T10:00:00Z',
    published_at: '2024-06-08T10:00:00Z'
  },
  {
    id: 'sample_2',
    title: 'Federal Budget 2024: Key Highlights for Canadian Families',
    slug: 'federal-budget-2024-highlights',
    content: 'Finance Minister Chrystia Freeland presented the 2024 federal budget, focusing on affordability measures for Canadian families and significant investments in healthcare and climate action.\n\nKey highlights include a new national childcare benefit that will provide up to $500 per month per child under 12, and a dental care program expansion covering all Canadians earning less than $90,000 annually.\n\nThe budget also allocates $12 billion over five years for climate initiatives, including rebates for electric vehicle purchases and home energy efficiency upgrades. Critics argue the spending may worsen inflation, while supporters praise the focus on social programs.',
    excerpt: 'Finance Minister presents budget with new childcare benefits and expanded dental care coverage.',
    author: 'Michael Chen',
    category: 'Canada',
    image: 'photo-1551288049-bebda4e38f71',
    tags: ['budget', 'politics', 'healthcare', 'families'],
    featured: false,
    published: true,
    created_at: '2024-06-07T14:30:00Z',
    updated_at: '2024-06-07T14:30:00Z',
    published_at: '2024-06-07T14:30:00Z'
  },
  {
    id: 'sample_3',
    title: 'Global Climate Summit Reaches Historic Agreement',
    slug: 'global-climate-summit-agreement',
    content: 'World leaders at the Global Climate Summit in Geneva have reached a historic agreement to accelerate the transition to renewable energy and phase out fossil fuels by 2050.\n\nThe agreement, signed by 195 countries including Canada, commits nations to reduce greenhouse gas emissions by 50% by 2030 compared to 2005 levels. Developing countries will receive $100 billion annually in climate finance to support their transition.\n\nPrime Minister Justin Trudeau called the agreement "a crucial step forward for humanity" and announced Canada will increase its climate targets. Environmental groups cautiously welcomed the deal while emphasizing the need for immediate action.',
    excerpt: '195 countries commit to phasing out fossil fuels by 2050 in historic climate agreement.',
    author: 'Emma Rodriguez',
    category: 'World',
    image: 'photo-1569163139394-de4e4f43e4e3',
    tags: ['climate', 'environment', 'global', 'politics'],
    featured: false,
    published: true,
    created_at: '2024-06-06T16:45:00Z',
    updated_at: '2024-06-06T16:45:00Z',
    published_at: '2024-06-06T16:45:00Z'
  },
  {
    id: 'sample_4',
    title: 'The Future of Canadian Healthcare: A Critical Perspective',
    slug: 'future-canadian-healthcare-perspective',
    content: 'As Canada grapples with healthcare worker shortages and increasing wait times, it\'s time for a serious conversation about the future of our public healthcare system.\n\nThe pandemic exposed critical weaknesses in our healthcare infrastructure. Nurses are leaving the profession in record numbers, family doctors are becoming increasingly scarce, and patients are waiting months for essential procedures.\n\nWhile throwing more money at the problem seems like an easy solution, we need systemic reform. This includes better integration between federal and provincial systems, increased investment in medical education, and innovative approaches to healthcare delivery including telemedicine and AI-assisted diagnostics.\n\nThe time for incremental change has passed. Bold action is needed to preserve the universal healthcare system that defines Canadian values.',
    excerpt: 'Canada needs systemic healthcare reform beyond increased funding to address critical shortages.',
    author: 'Dr. Patricia Williams',
    category: 'Opinion',
    image: 'photo-1576091160399-112ba8d25d1f',
    tags: ['healthcare', 'opinion', 'policy', 'canada'],
    featured: false,
    published: true,
    created_at: '2024-06-05T11:20:00Z',
    updated_at: '2024-06-05T11:20:00Z',
    published_at: '2024-06-05T11:20:00Z'
  },
  {
    id: 'sample_5',
    title: 'Toronto International Film Festival 2024: What to Expect',
    slug: 'tiff-2024-preview',
    content: 'The Toronto International Film Festival returns this September with an exciting lineup of world premieres, celebrity appearances, and groundbreaking cinema from around the globe.\n\nThis year\'s festival will feature over 300 films from 80 countries, including highly anticipated premieres of major Hollywood productions and indie darlings. The opening night gala will showcase a Canadian production for the first time in five years.\n\nNotable premieres include the latest from acclaimed director Denis Villeneuve, a documentary about Indigenous rights, and several films addressing climate change and social justice themes.\n\nTickets go on sale July 15th for TIFF members and July 22nd for the general public. Festival organizers expect over 400,000 attendees across the 10-day event.',
    excerpt: 'TIFF 2024 promises over 300 films from 80 countries with exciting world premieres this September.',
    author: 'James Park',
    category: 'Events',
    image: 'photo-1489824904134-891ab64532f1',
    tags: ['film', 'festival', 'toronto', 'entertainment'],
    featured: false,
    published: true,
    created_at: '2024-06-04T13:15:00Z',
    updated_at: '2024-06-04T13:15:00Z',
    published_at: '2024-06-04T13:15:00Z'
  },
  {
    id: 'sample_6',
    title: 'Downtown Toronto Revitalization Project Breaks Ground',
    slug: 'downtown-toronto-revitalization',
    content: 'A major revitalization project in downtown Toronto officially broke ground today, promising to transform the waterfront district with new residential towers, commercial spaces, and public parks.\n\nThe $2.8 billion project will create 5,000 new residential units, including 1,500 affordable housing units, alongside retail spaces and a new community center. The development is expected to be completed in phases over the next eight years.\n\nCity planners emphasize the project\'s focus on sustainability, with all buildings meeting LEED Gold standards and extensive green spaces integrated throughout the development.',
    excerpt: '$2.8 billion waterfront revitalization project begins, creating 5,000 new homes including affordable housing.',
    author: 'Lisa Wong',
    category: 'Local',
    image: 'photo-1449824904134-891ab64532f1',
    tags: ['development', 'housing', 'toronto', 'waterfront'],
    featured: false,
    published: true,
    created_at: '2024-06-03T09:30:00Z',
    updated_at: '2024-06-03T09:30:00Z',
    published_at: '2024-06-03T09:30:00Z'
  }
]

const getFallbackArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(FALLBACK_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    } else {
      // Initialize with sample articles if none exist
      saveFallbackArticles(sampleArticles)
      return sampleArticles
    }
  } catch {
    // If there's an error, return sample articles
    saveFallbackArticles(sampleArticles)
    return sampleArticles
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
