
import { supabase } from '../lib/supabase'

export const authService = {
  // Admin login
  async loginAdmin(email: string, password: string) {
    try {
      // Check if admin exists in the database
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !admin) {
        throw new Error('Invalid credentials')
      }

      // Simple password check (in production, use proper hashing)
      if (password !== 'admin123') {
        throw new Error('Invalid credentials')
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', admin.id)

      // Store session in localStorage
      const sessionData = {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        },
        token: 'admin-session-token'
      }
      
      localStorage.setItem('admin_session', JSON.stringify(sessionData))
      return sessionData
    } catch (error) {
      throw error
    }
  },

  // Check if admin is logged in
  isLoggedIn(): boolean {
    const session = localStorage.getItem('admin_session')
    return !!session
  },

  // Get current admin user
  getCurrentUser() {
    const session = localStorage.getItem('admin_session')
    if (session) {
      return JSON.parse(session).user
    }
    return null
  },

  // Logout admin
  logout() {
    localStorage.removeItem('admin_session')
  }
}
