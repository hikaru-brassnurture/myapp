import api from './client'

export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface AuthResponse {
  token: string
  user: User
}

export const register = (name: string, email: string, password: string) =>
  api.post<AuthResponse>('/auth/register', { name, email, password })

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password })

export const getMe = () => api.get<User>('/me')

export const updateMe = (name: string) => api.put<User>('/me', { name })