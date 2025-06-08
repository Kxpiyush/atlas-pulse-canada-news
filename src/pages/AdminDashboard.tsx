
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Image, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  BarChart,
  Users,
  Eye
} from 'lucide-react';
import Header from '../components/Header';
import { sampleArticles, Article } from '../data/sampleArticles';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articles, setArticles] = useState(sampleArticles);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login - in real app, this would authenticate against backend
    if (loginData.email === 'admin@atlashype.com' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin@atlashype.com / admin123');
    }
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the AtlasHype admin dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="admin@atlashype.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Demo Credentials:</strong><br />
                Email: admin@atlashype.com<br />
                Password: admin123
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                      activeTab === 'dashboard' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <BarChart size={16} />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('articles')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                      activeTab === 'articles' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={16} />
                    <span>Articles</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('new-article')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                      activeTab === 'new-article' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Plus size={16} />
                    <span>New Article</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('media')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                      activeTab === 'media' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Image size={16} />
                    <span>Media</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 ${
                      activeTab === 'settings' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <FileText className="text-blue-500" size={24} />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Articles</p>
                        <p className="text-2xl font-bold">{articles.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <Eye className="text-green-500" size={24} />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Monthly Views</p>
                        <p className="text-2xl font-bold">45.2K</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <Users className="text-purple-500" size={24} />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Subscribers</p>
                        <p className="text-2xl font-bold">1,234</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <BarChart className="text-red-500" size={24} />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Engagement</p>
                        <p className="text-2xl font-bold">87%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Articles</h2>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map(article => (
                      <div key={article.id} className="flex items-center justify-between p-4 border rounded">
                        <div>
                          <h3 className="font-medium">{article.title}</h3>
                          <p className="text-sm text-gray-600">
                            {article.category} • {article.author} • {new Date(article.publishedAt).toLocaleDateString()}
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
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-left py-2">Author</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(article => (
                        <tr key={article.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={`https://images.unsplash.com/${article.image}?w=60&h=40&fit=crop`}
                                alt={article.title}
                                className="w-12 h-8 object-cover rounded"
                              />
                              <span className="font-medium truncate max-w-xs">{article.title}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {article.category}
                            </span>
                          </td>
                          <td className="py-3">{article.author}</td>
                          <td className="py-3">{new Date(article.publishedAt).toLocaleDateString()}</td>
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
              </div>
            )}

            {activeTab === 'new-article' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Create New Article</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter article title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Local</option>
                        <option>Canada</option>
                        <option>World</option>
                        <option>Opinion</option>
                        <option>Events</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Author name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea 
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Brief description of the article"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Image size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea 
                      rows={15}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Write your article content here..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      type="submit"
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Publish Article
                    </button>
                    <button 
                      type="button"
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
                    >
                      Save Draft
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Media Library</h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Upload Media</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {sampleArticles.map(article => (
                    <div key={article.id} className="relative group">
                      <img 
                        src={`https://images.unsplash.com/${article.image}?w=200&h=150&fit=crop`}
                        alt={article.title}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                        <button className="text-white hover:text-red-300">
                          <Eye size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
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
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">User Management</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                        <input 
                          type="email" 
                          defaultValue="admin@atlashype.com"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Change Password
                      </button>
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
  );
};

export default AdminDashboard;
