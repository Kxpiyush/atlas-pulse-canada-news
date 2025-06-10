import { supabase } from '../lib/supabase'

export const authService = {
  // Admin login - simplified for demo purposes
  async loginAdmin(email: string, password: string) {
    try {
      // Check if admin exists in the database
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        console.error('Database error:', error)
        throw new Error('Invalid credentials')
      }

      if (!admin) {
        throw new Error('Invalid credentials')
      }

      // Simple password validation (in production, use proper authentication)
      const validCredentials = [
        { email: 'kxpiyush@gmail.com', password: 'Anish28$' },
        { email: 'admin@atlashype.com', password: 'admin123' }
      ]

      const isValid = validCredentials.some(
        cred => cred.email === email && cred.password === password
      )

      if (!isValid) {
        throw new Error('Invalid credentials')
      }

      // Store session in localStorage (simplified for demo)
      const sessionData = {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        },
        token: 'admin-session-token',
        timestamp: Date.now()
      }
      
      localStorage.setItem('admin_session', JSON.stringify(sessionData))
      return sessionData
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Check if admin is logged in
  isLoggedIn(): boolean {
    try {
      const session = localStorage.getItem('admin_session')
      if (!session) return false

      const sessionData = JSON.parse(session)
      // Check if session is less than 24 hours old
      const isValid = sessionData.timestamp && (Date.now() - sessionData.timestamp) < 24 * 60 * 60 * 1000
      
      if (!isValid) {
        localStorage.removeItem('admin_session')
        return false
      }

      return true
    } catch {
      return false
    }
  },

  // Get current admin user
  getCurrentUser() {
    try {
      const session = localStorage.getItem('admin_session')
      if (session) {
        const sessionData = JSON.parse(session)
        return sessionData.user
      }
      return null
    } catch {
      return null
    }
  },

  // Logout admin
  logout() {
    localStorage.removeItem('admin_session')
  }
}