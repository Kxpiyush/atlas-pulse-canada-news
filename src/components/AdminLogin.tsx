
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { setupDatabase } from '../utils/setupDatabase'
import Header from './Header'

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({ email: 'kxpiyush@gmail.com', password: '' })
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [setupMessage, setSetupMessage] = useState('')
  const [loginError, setLoginError] = useState('')
  const { login, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      await login(loginData.email, loginData.password)
    } catch (error) {
      console.error('Login failed:', error)
      setLoginError(error.message || 'Login failed')
    }
  }

  const handleSetupDatabase = async () => {
    setIsSettingUp(true)
    setSetupMessage('')
    try {
      const result = await setupDatabase()
      if (result.success) {
        setSetupMessage(result.message || 'Database setup completed successfully! You can now login.')
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

          {/* Info about RLS issue */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-md">
            <p className="text-sm text-yellow-800 mb-3">
              <strong>Note:</strong> Using fallback authentication due to Supabase RLS policy configuration. 
              You can login directly with your credentials.
            </p>
            <button
              onClick={handleSetupDatabase}
              disabled={isSettingUp}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              {isSettingUp ? 'Checking system...' : 'Check System Status'}
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

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}
            
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
