
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ArticleCard from '../components/ArticleCard'
import { useFeaturedArticles, useArticlesByCategory } from '../hooks/useArticles'
import { Link } from 'react-router-dom'

const Index = () => {
  const { data: featuredArticles = [], isLoading: featuredLoading } = useFeaturedArticles()
  const { data: localArticles = [] } = useArticlesByCategory('Local')
  const { data: canadaArticles = [] } = useArticlesByCategory('Canada')
  const { data: worldArticles = [] } = useArticlesByCategory('World')

  const featuredArticle = featuredArticles[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Featured Story */}
        {featuredLoading ? (
          <section className="relative h-96 bg-gray-300 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xl">Loading featured story...</div>
            </div>
          </section>
        ) : featuredArticle ? (
          <section className="relative h-96 bg-gradient-to-r from-red-600 to-red-800">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {featuredArticle.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {featuredArticle.title}
                </h1>
                <p className="text-xl mb-6 opacity-90">
                  {featuredArticle.excerpt}
                </p>
                <Link 
                  to={`/news/${featuredArticle.slug}`}
                  className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* Local News */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Local Toronto News</h2>
            <Link to="/local" className="text-red-600 hover:text-red-800 font-medium">
              View All Local News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localArticles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Canada News */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Canada News</h2>
              <Link to="/canada" className="text-red-600 hover:text-red-800 font-medium">
                View All Canada News →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {canadaArticles.slice(0, 3).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* World News */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">World News</h2>
            <Link to="/world" className="text-red-600 hover:text-red-800 font-medium">
              View All World News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worldArticles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl mb-6 opacity-90">
              Get the latest Toronto and Canadian news delivered to your inbox
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

export default Index
