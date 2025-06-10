import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { setupDatabase } from '../utils/setupDatabase'
import Header from './Header'

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({ email: 'kxpiyush@gmail.com', password: '' })
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [setupMessage, setSetupMessage] = useState('')
  const { login, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(loginData.email, loginData.password)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleSetupDatabase = async () => {
    setIsSettingUp(true)
    setSetupMessage('')
    try {
      const result = await setupDatabase()
      if (result.success) {
        setSetupMessage('Database setup completed successfully! You can now login.')
      } else {
        setSetupMessage(`Database setup failed: ${result.error}`)
      }
    } catch (error) {
      setSetupMessage(`Database setup failed: ${error.message}`)
    }
    setIsSettingUp(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the AtlasHype admin dashboard</p>
          </div>

          {/* Setup Database Button */}
          <div className="mb-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800 mb-3">
              First time setup? Initialize your database:
            </p>
            <button
              onClick={handleSetupDatabase}
              disabled={isSettingUp}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSettingUp ? 'Setting up database...' : 'Setup Database'}
            </button>
            {setupMessage && (
              <p className={`text-sm mt-2 ${setupMessage.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                {setupMessage}
              </p>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
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
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Your Admin Credentials:</strong><br />
              Email: kxpiyush@gmail.com<br />
              Password: Anish28$
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminLogin