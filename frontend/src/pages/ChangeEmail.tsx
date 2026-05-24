import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { changeEmail } from '../api/auth'
import styles from '../styles/ChangeEmail.module.scss'

export default function ChangeEmail() {
  const navigate = useNavigate()
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await changeEmail(newEmail, currentPassword)
      setSuccess('メールアドレスを変更しました')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch {
      setError('変更に失敗しました。パスワードを確認してください。')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>メールアドレス変更</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>新しいメールアドレス</label>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>現在のパスワード</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button type="submit" className={styles.button}>変更する</button>
          <button type="button" className={styles.back} onClick={() => navigate('/dashboard')}>
            戻る
          </button>
        </form>
      </div>
    </div>
  )
}