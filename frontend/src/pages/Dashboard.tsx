import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe, type User } from '../api/auth'
import styles from '../styles/Dashboard.module.scss'

interface Props {
  user: User
  onUpdate: (user: User) => void
  onLogout: () => void
}

export default function Dashboard({ user, onUpdate, onLogout }: Props) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await updateMe(name)
      onUpdate(res.data)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          MyApp
        </h1>
        <button onClick={onLogout} className={styles.logoutBtn}>ログアウト</button>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>プロフィール</h2>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>名前</span>
            {editing
              ? <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
              : <span className={styles.fieldValue}>{user.name}</span>
            }
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>メールアドレス</span>
            <span className={styles.fieldValue}>{user.email}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>登録日</span>
            <span className={styles.fieldValue}>{new Date(user.created_at).toLocaleDateString('ja-JP')}</span>
          </div>
          <div className={styles.actions}>
            {editing ? (
              <>
                <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
                  {saving ? '保存中...' : '保存'}
                </button>
                <button onClick={() => { setEditing(false); setName(user.name) }} className={styles.cancelBtn}>
                  キャンセル
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className={styles.editBtn}>
                編集
              </button>
            )}
            <button onClick={() => navigate('/change-password')} className={styles.linkBtn}>
              パスワード変更
            </button>
            <button onClick={() => navigate('/change-email')} className={styles.linkBtn}>
              メールアドレス変更
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}