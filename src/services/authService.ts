
import { supabase } from '../lib/supabase'

export const authService = {
  // Admin login
  async loginAdmin(email: string, password: string) {
    try {
      const response = await fetch('/functions/v1/auth-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store session in localStorage
      localStorage.setItem('admin_session', JSON.stringify(data))
      return data
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
