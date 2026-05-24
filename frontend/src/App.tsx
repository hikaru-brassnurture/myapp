import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ChangePassword from './pages/ChangePassword'
import ChangeEmail from './pages/ChangeEmail'

export default function App() {
  const { user, setUser, loading, logout } = useAuth()

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#888' }}>読み込み中...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={setUser} />} />
      <Route path="/dashboard" element={user ? <Dashboard user={user} onUpdate={setUser} onLogout={logout} /> : <Navigate to="/login" />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/change-email" element={user ? <ChangeEmail /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
    </Routes>
  )
}