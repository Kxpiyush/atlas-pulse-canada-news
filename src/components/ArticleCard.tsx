
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
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

  if (variant === 'featured') {
    return (
      <Link to={`/news/${article.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src={article.image ? `https://images.unsplash.com/${article.image}?w=800&h=400&fit=crop` : `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop`}
            alt={article.title}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block bg-red-600 text-xs font-semibold px-2 py-1 rounded mb-2">
              {article.category}
            </span>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-red-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-2 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center text-sm text-gray-300 space-x-4">
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{formatDate(displayDate)}</span>
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
        <div className="flex space-x-3">
          <img 
            src={article.image ? `https://images.unsplash.com/${article.image}?w=150&h=100&fit=crop` : `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&h=100&fit=crop`}
            alt={article.title}
            className="w-20 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium text-sm group-hover:text-red-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
              <span>{formatDate(displayDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${article.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img 
          src={article.image ? `https://images.unsplash.com/${article.image}?w=400&h=250&fit=crop` : `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop`}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded mb-2">
            {article.category}
          </span>
          <h3 className="font-bold text-lg mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{formatDate(displayDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
