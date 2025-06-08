
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import Header from '../components/Header'
import AdminLogin from '../components/AdminLogin'
import AdminSidebar from '../components/AdminSidebar'
import AdminDashboardStats from '../components/AdminDashboardStats'
import ArticleForm from '../components/ArticleForm'
import { useAuth } from '../hooks/useAuth'
import { useAllArticles, useDeleteArticle } from '../hooks/useArticles'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { isLoggedIn, logout, loading } = useAuth()
  const { data: articles = [], isLoading: articlesLoading } = useAllArticles()
  const deleteArticle = useDeleteArticle()

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle.mutateAsync(id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <AdminDashboardStats totalArticles={articles.length} />
                
                {/* Recent Articles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Articles</h2>
                  {articlesLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {articles.slice(0, 5).map(article => (
                        <div key={article.id} className="flex items-center justify-between p-4 border rounded">
                          <div>
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-gray-600">
                              {article.category} • {article.author} • {new Date(article.published_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Link 
                              to={`/news/${article.slug}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye size={16} />
                            </Link>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Manage Articles</h2>
                  <button
                    onClick={() => setActiveTab('new-article')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>New Article</span>
                  </button>
                </div>
                
                {articlesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Title</th>
                          <th className="text-left py-2">Category</th>
                          <th className="text-left py-2">Author</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map(article => (
                          <tr key={article.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">
                              <span className="font-medium truncate max-w-xs">{article.title}</span>
                            </td>
                            <td className="py-3">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                {article.category}
                              </span>
                            </td>
                            <td className="py-3">{article.author}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded text-sm ${
                                article.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {article.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="py-3">{new Date(article.created_at).toLocaleDateString()}</td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Link 
                                  to={`/news/${article.slug}`}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="View"
                                >
                                  <Eye size={16} />
                                </Link>
                                <button 
                                  className="text-gray-600 hover:text-gray-800"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteArticle(article.id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Delete"
                                  disabled={deleteArticle.isPending}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'new-article' && <ArticleForm />}

            {activeTab === 'media' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Media Library</h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Upload Media</span>
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <p>Media management will be implemented with file upload functionality.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Site Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Title</label>
                        <input 
                          type="text" 
                          defaultValue="AtlasHype"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Description</label>
                        <textarea 
                          rows={3}
                          defaultValue="Toronto & Canadian News"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
