import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, type User } from '../api/auth'
import styles from '../styles/Login.module.scss'

interface Props {
  onLogin: (user: User) => void
}

export default function Login({ onLogin }: Props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      navigate('/dashboard')
    } catch {
      setError('メールアドレスまたはパスワードが違います')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>おかえりなさい</h1>
        <p className={styles.subtitle}>アカウントにログインしてください</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>メールアドレス</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} placeholder="you@example.com" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>パスワード</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <p className={styles.footer}>
          アカウントをお持ちでない方は <Link to="/register">新規登録</Link>
        </p>
      </div>
    </div>
  )
}