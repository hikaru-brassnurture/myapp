import { useState, useEffect } from 'react'
import { getMe, type User } from '../api/auth'

export function useAuth() {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(!!token) // トークンがあるときだけtrueで始める

  useEffect(() => {
    if (!token) return
    getMe()
      .then((res: {data: User}) => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, setUser, loading, logout }
}