
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { sampleArticles, getArticlesByCategory } from '../data/sampleArticles';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredArticle = sampleArticles[0];
  const localNews = getArticlesByCategory('Local').slice(0, 3);
  const canadaNews = getArticlesByCategory('Canada').slice(0, 3);
  const worldNews = getArticlesByCategory('World').slice(0, 3);
  const opinionArticles = getArticlesByCategory('Opinion').slice(0, 2);
  const eventArticles = getArticlesByCategory('Events').slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Featured Story Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Featured Story</h2>
          <ArticleCard article={featuredArticle} variant="featured" />
        </section>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Local News */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Toronto & Local News</h2>
                  <Link to="/local" className="text-red-600 hover:text-red-800 font-medium">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {localNews.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>

              {/* Canada News */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Canada News</h2>
                  <Link to="/canada" className="text-red-600 hover:text-red-800 font-medium">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {canadaNews.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>

              {/* World News */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">World News</h2>
                  <Link to="/world" className="text-red-600 hover:text-red-800 font-medium">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {worldNews.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending News */}
              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {sampleArticles.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <Link 
                        to={`/news/${article.slug}`}
                        className="text-sm font-medium hover:text-red-600 transition-colors line-clamp-2"
                      >
                        {article.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Opinion */}
              <section className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Opinion</h3>
                  <Link to="/opinion" className="text-red-600 hover:text-red-800 text-sm">
                    More →
                  </Link>
                </div>
                <div className="space-y-4">
                  {opinionArticles.map(article => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                  ))}
                </div>
              </section>

              {/* Events */}
              <section className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Upcoming Events</h3>
                  <Link to="/events" className="text-red-600 hover:text-red-800 text-sm">
                    More →
                  </Link>
                </div>
                <div className="space-y-4">
                  {eventArticles.map(article => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                  ))}
                </div>
              </section>

              {/* Ad Placeholder */}
              <section className="bg-gray-100 rounded-lg p-6 text-center">
                <div className="text-gray-500 mb-2">Advertisement</div>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded h-32 flex items-center justify-center">
                  <span className="text-gray-400">Google AdSense Placeholder</span>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <section className="bg-red-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl mb-6">Get the latest Toronto and Canadian news delivered to your inbox</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
