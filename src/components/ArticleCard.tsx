
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import type { Article } from '../lib/supabase';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'small';
}

const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Use published_at if available, otherwise fall back to created_at
  const displayDate = article.published_at || article.created_at;

  // Better image handling with more professional images
  const getImageUrl = (imageId?: string) => {
    if (imageId) {
      return `https://images.unsplash.com/${imageId}?w=800&h=400&fit=crop&auto=format&q=80`;
    }
    // Fallback to a professional news image
    return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop&auto=format&q=80';
  };

  if (variant === 'featured') {
    return (
      <Link to={`/news/${article.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
          <img 
            src={getImageUrl(article.image)}
            alt={article.title}
            className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {article.category}
              </span>
              {article.featured && (
                <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-3 group-hover:text-red-300 transition-colors leading-tight">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-4 line-clamp-2 text-lg leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-300 space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{formatDate(displayDate)}</span>
                </div>
              </div>
              <div className="flex items-center text-red-300 font-semibold group-hover:text-white transition-colors">
                <span className="mr-2">Read More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'small') {
    return (
      <Link to={`/news/${article.slug}`} className="block group">
        <div className="flex space-x-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
          <img 
            src={getImageUrl(article.image)}
            alt={article.title}
            className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded mb-2">
              {article.category}
            </span>
            <h3 className="font-semibold text-sm group-hover:text-red-600 transition-colors line-clamp-2 leading-tight mb-2">
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 space-x-3">
              <span className="font-medium">{article.author}</span>
              <span>{formatDate(displayDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${article.slug}`} className="block group">
      <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img 
            src={getImageUrl(article.image)}
            alt={article.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
              {article.category}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{formatDate(displayDate)}</span>
              </div>
            </div>
            <div className="flex items-center text-red-600 font-semibold group-hover:text-red-800 transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
