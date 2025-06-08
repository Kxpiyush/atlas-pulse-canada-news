
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Share2, Facebook, Twitter } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ArticleCard from '../components/ArticleCard'
import { useArticleBySlug, useArticlesByCategory } from '../hooks/useArticles'

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading } = useArticleBySlug(slug || '')
  const { data: relatedArticles = [] } = useArticlesByCategory(article?.category || '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-8"></div>
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Return to Homepage
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const relatedFilteredArticles = relatedArticles
    .filter(related => related.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
              <Link to="/" className="text-red-600 hover:underline">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to={`/${article.category.toLowerCase()}`} className="text-red-600 hover:underline">
                {article.category}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{article.title}</span>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center text-gray-600 text-sm mb-6">
                <User size={16} className="mr-2" />
                <span className="mr-4">By {article.author}</span>
                <Calendar size={16} className="mr-2" />
                <time dateTime={article.published_at}>
                  {new Date(article.published_at).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              {article.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {article.image && (
              <div className="mb-8">
                <img 
                  src={`https://images.unsplash.com/${article.image}?w=1200&h=600&fit=crop`}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Share2 size={20} className="mr-2" />
                Share this article
              </h3>
              <div className="flex space-x-4">
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  <Facebook size={16} className="mr-2" />
                  Facebook
                </button>
                <button className="flex items-center bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                  <Twitter size={16} className="mr-2" />
                  Twitter
                </button>
              </div>
            </div>

            {/* Ad Placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
              <p className="text-gray-500">Advertisement</p>
              <p className="text-sm text-gray-400">Google AdSense placeholder</p>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedFilteredArticles.length > 0 && (
          <section className="bg-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedFilteredArticles.map(relatedArticle => (
                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ArticlePage
