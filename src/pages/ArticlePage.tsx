
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { getArticleBySlug, getRelatedArticles } from '../data/sampleArticles';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.id, article.category);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareUrl = `${window.location.origin}/news/${article.slug}`;

  const handleShare = (platform: string) => {
    const text = `${article.title} - AtlasHype`;
    const url = shareUrl;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link to="/" className="text-red-600 hover:text-red-800">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to={`/${article.category.toLowerCase()}`} className="text-red-600 hover:text-red-800">
              {article.category}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{article.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-gray-500" />
                  <span className="font-medium text-gray-700">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-gray-600">{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Share:</span>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  Twitter
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Facebook
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Share size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src={`https://images.unsplash.com/${article.image}?w=1200&h=600&fit=crop`}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{article.author}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {article.author} is a senior correspondent covering Toronto and Canadian news for AtlasHype. 
                        With over a decade of experience in journalism, they specialize in {article.category.toLowerCase()} reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Ad Placeholder */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-500 mb-2 text-sm">Advertisement</div>
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded h-32 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Google AdSense</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-red-700 mb-3">Get our latest stories delivered to your inbox</p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 text-sm rounded mb-2"
                  />
                  <button className="w-full bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
