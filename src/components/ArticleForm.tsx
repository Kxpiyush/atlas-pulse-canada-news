
import React, { useState } from 'react'
import { useCreateArticle } from '../hooks/useArticles'
import { articleService } from '../services/articleService'

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Local',
    author: '',
    excerpt: '',
    content: '',
    tags: '',
    featured: false,
    published: true,
  })

  const createArticle = useCreateArticle()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const slug = articleService.generateSlug(formData.title)
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    
    const articleData = {
      ...formData,
      slug,
      tags: tagsArray,
      published_at: new Date().toISOString(),
    }

    try {
      await createArticle.mutateAsync(articleData)
      // Reset form
      setFormData({
        title: '',
        category: 'Local',
        author: '',
        excerpt: '',
        content: '',
        tags: '',
        featured: false,
        published: true,
      })
    } catch (error) {
      // Error is handled in the hook
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter article title"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Local">Local</option>
              <option value="Canada">Canada</option>
              <option value="World">World</option>
              <option value="Opinion">Opinion</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input 
              type="text" 
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Author name"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea 
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Brief description of the article"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea 
            rows={15}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Write your article content here..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input 
            type="text" 
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="mr-2"
            />
            Featured Article
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
              className="mr-2"
            />
            Publish Now
          </label>
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit"
            disabled={createArticle.isPending}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {createArticle.isPending ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ArticleForm
