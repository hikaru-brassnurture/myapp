import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const navigate = useNavigate()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const skillCategories = [
  {
    category: '言語',
    items: ['TypeScript', 'Go'],
  },
  {
    category: 'フレームワーク',
    items: ['React', 'Gin'],
  },
  {
    category: 'データベース',
    items: ['PostgreSQL', 'SQLite'],
  },
  {
    category: 'インフラ',
    items: ['Docker'],
  },
]

  const works = [
    { title: 'MyApp', description: 'ログイン・データ管理Webアプリ', tech: ['React', 'TypeScript', 'Go', 'SQLite'] },
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const filteredWorks = selectedSkills.length === 0
    ? works
    : works.filter(work => selectedSkills.every(s => work.tech.includes(s)))

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>MyApp</h1>
        <div className={styles.headerButtons}>
          <button onClick={() => navigate('/login')} className={styles.loginBtn}>ログイン</button>
          <button onClick={() => navigate('/register')} className={styles.registerBtn}>新規登録</button>
        </div>
      </header>

      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to MyApp</h2>
        <p className={styles.heroText}>スキルと制作物を紹介するポートフォリオサイトです。</p>
      </section>

      <section className={styles.section}>
  <h2 className={styles.sectionTitle}>Skills</h2>
  {skillCategories.map(category => (
    <div key={category.category} className={styles.skillCategory}>
      <h3 className={styles.skillCategoryTitle}>{category.category}</h3>
      <div className={styles.skillList}>
        {category.items.map(skill => (
          <span
            key={skill}
            className={`${styles.skillTag} ${selectedSkills.includes(skill) ? styles.skillTagActive : ''}`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
  {selectedSkills.length > 0 && (
    <button className={styles.clearBtn} onClick={() => setSelectedSkills([])}>
      フィルターをクリア
    </button>
  )}
</section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Works</h2>
        {filteredWorks.length === 0 ? (
          <p className={styles.noResults}>該当する制作物がありません</p>
        ) : (
          <div className={styles.workList}>
            {filteredWorks.map(work => (
              <div key={work.title} className={styles.workCard}>
                <h3 className={styles.workTitle}>{work.title}</h3>
                <p className={styles.workDesc}>{work.description}</p>
                <div className={styles.workTechList}>
                  {work.tech.map(t => (
                    <span key={t} className={styles.workTech}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>© 2026 MyApp</p>
      </footer>
    </div>
  )
}