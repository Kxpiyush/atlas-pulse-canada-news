
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ArticleCard from '../components/ArticleCard'
import { useArticlesByCategory } from '../hooks/useArticles'

const CategoryPage = () => {
  const { '*': categoryPath } = useParams()
  const category = categoryPath?.charAt(0).toUpperCase() + categoryPath?.slice(1) || ''
  const { data: articles = [], isLoading } = useArticlesByCategory(category)

  const getCategoryDescription = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'local':
        return 'Stay updated with the latest news from Toronto and the Greater Toronto Area, covering city politics, community events, and local developments.'
      case 'canada':
        return 'Breaking news and in-depth coverage of national politics, economy, and social issues across Canada.'
      case 'world':
        return 'International news and global events that impact Canada and the world, with expert analysis and reporting.'
      case 'opinion':
        return 'Thoughtful commentary and analysis from our expert columnists and guest contributors on current events and issues.'
      case 'events':
        return 'Discover upcoming events, festivals, and cultural happenings in Toronto and across Canada.'
      default:
        return 'Latest news and updates from AtlasHype.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Category Header */}
        <section className="bg-red-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="text-sm mb-4 opacity-90">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <span>{category}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category} News</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                {getCategoryDescription(category)}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">No Articles Found</h2>
              <p className="text-gray-600 mb-8">
                We don't have any {category.toLowerCase()} articles at the moment. Check back soon!
              </p>
              <Link 
                to="/" 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Any {category} News</h2>
            <p className="text-xl mb-6 opacity-90">
              Subscribe to get the latest {category.toLowerCase()} stories delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default CategoryPage
