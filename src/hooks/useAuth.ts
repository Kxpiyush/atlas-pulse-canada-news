
import { useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { useToast } from '@/hooks/use-toast'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const loggedIn = authService.isLoggedIn()
    const currentUser = authService.getCurrentUser()
    
    setIsLoggedIn(loggedIn)
    setUser(currentUser)
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      await authService.loginAdmin(email, password)
      checkAuthStatus()
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Login failed',
        variant: 'destructive',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setIsLoggedIn(false)
    setUser(null)
    toast({
      title: 'Success',
      description: 'Logged out successfully',
    })
  }

  return {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
  }
}
