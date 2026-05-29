/**
 * Home.tsx
 * ホーム画面
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { works } from '../data/works';
import styles from '../styles/Home.module.scss';

const SCALES = [
  { label: '1ヶ月', months: 1, pxPerDay: 3 },
  { label: '3ヶ月', months: 3, pxPerDay: 1 },
  { label: '6ヶ月', months: 6, pxPerDay: 0.5 },
  { label: '1年', months: 12, pxPerDay: 0.25 },
];

const COLORS = [
  '#4f46e5',
  '#0891b2',
  '#059669',
  '#d97706',
  '#dc2626',
  '#7c3aed',
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [scaleIndex, setScaleIndex] = useState(3);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);

  const pxPerDay = SCALES[scaleIndex].pxPerDay;

  const now = useMemo(() => new Date(), []);

  const skillCategories = [
    {
      category: '言語',
      items: [
        'TypeScript',
        'Go',
        'JavaScript',
        'Java',
        'HTML',
        'CSS',
        'C言語',
      ].sort(),
    },
    {
      category: 'フレームワーク',
      items: ['React', 'seasar2', 'Spring'].sort(),
    },
    {
      category: 'データベース',
      items: ['PostgreSQL', 'SQLite', 'Oracle'].sort(),
    },
    { category: 'インフラ', items: ['Docker'].sort() },
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredWorks = (
    selectedSkills.length === 0
      ? works
      : works.filter((work) =>
          selectedSkills.every((s) => work.tech.includes(s))
        )
  )
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  const { fullStart, fullEnd } = useMemo(() => {
    const source = filteredWorks.length > 0 ? filteredWorks : works;
    const starts = source.map((w) => new Date(w.startDate).getTime());
    const ends = source.map((w) =>
      w.endDate ? new Date(w.endDate).getTime() : now.getTime()
    );
    return {
      fullStart: new Date(Math.min(...starts)),
      fullEnd: new Date(Math.max(...ends)),
    };
  }, [filteredWorks, now]);

  const CHART_PADDING = 40;

  const toPx = (date: Date) => {
    const days = (date.getTime() - fullStart.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, days * pxPerDay) + CHART_PADDING;
  };

  const chartWidth =
    Math.ceil(
      ((fullEnd.getTime() - fullStart.getTime()) / (1000 * 60 * 60 * 24)) *
        pxPerDay
    ) +
    60 +
    CHART_PADDING;

  const todayPx = toPx(now);

  const gridLines = useMemo(() => {
    const interval = SCALES[scaleIndex].months;
    const lines: Date[] = [];
    const current = new Date(fullStart);
    current.setDate(1);
    current.setMonth(Math.floor(current.getMonth() / interval) * interval);
    while (current <= fullEnd) {
      if (current >= fullStart) lines.push(new Date(current));
      current.setMonth(current.getMonth() + interval);
    }
    return lines;
  }, [fullStart, fullEnd, scaleIndex]);

  const formatGridLabel = (date: Date) => {
    if (SCALES[scaleIndex].months === 12) return `${date.getFullYear()}`;
    return `${date.getFullYear()}/${date.getMonth() + 1}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>MyApp</h1>
        <div className={styles.headerButtons}>
          <button onClick={() => navigate('/docs')} className={styles.loginBtn}>
            仕様書
          </button>
          <button
            onClick={() => navigate('/login')}
            className={styles.loginBtn}
          >
            ログイン
          </button>
          <button
            onClick={() => navigate('/register')}
            className={styles.registerBtn}
          >
            新規登録
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to MyApp</h2>
        <p className={styles.heroText}>
          スキルと制作物を紹介するポートフォリオサイトです。
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        {skillCategories.map((category) => (
          <div key={category.category} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryTitle}>{category.category}</h3>
            <div className={styles.skillList}>
              {category.items.map((skill) => (
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
          <button
            className={styles.clearBtn}
            onClick={() => setSelectedSkills([])}
          >
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
            {filteredWorks.map((work) => (
              <div
                key={work.title}
                className={styles.workCard}
                onMouseEnter={() => setHoveredWork(work.title)}
                onMouseLeave={() => setHoveredWork(null)}
              >
                <h3 className={styles.workTitle}>{work.title}</h3>
                <p className={styles.workPeriod}>
                  {work.startDate} 〜 {work.endDate ?? '制作中'}
                </p>
                <p className={styles.workDesc}>{work.description}</p>
                <div className={styles.workTechList}>
                  {work.tech.map((t) => (
                    <span key={t} className={styles.workTech}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Timeline</h2>
        <div className={styles.timeline}>
          <div className={styles.scaleSelector}>
            {SCALES.map((scale, i) => (
              <button
                key={scale.label}
                className={`${styles.scaleBtn} ${scaleIndex === i ? styles.scaleBtnActive : ''}`}
                onClick={() => setScaleIndex(i)}
              >
                {scale.label}
              </button>
            ))}
          </div>

          <div className={styles.timelineChart}>
            <div style={{ width: `${chartWidth}px`, position: 'relative' }}>
              <div className={styles.monthLabels}>
                {gridLines.map((date, i) => (
                  <div
                    key={i}
                    className={styles.monthLabel}
                    style={{ left: `${toPx(date)}px` }}
                  >
                    {formatGridLabel(date)}
                  </div>
                ))}
              </div>

              <div className={styles.timelineBars}>
                {gridLines.map((date, i) => (
                  <div
                    key={i}
                    className={styles.gridLine}
                    style={{ left: `${toPx(date)}px` }}
                  />
                ))}
                <div
                  className={styles.todayLine}
                  style={{ left: `${todayPx}px` }}
                />
                {filteredWorks.map((work, index) => {
                  const start = new Date(work.startDate);
                  const end = work.endDate ? new Date(work.endDate) : now;
                  const left = toPx(start);
                  const width = toPx(end) - left;
                  return (
                    <div key={work.title} className={styles.timelineRow}>
                      <div
                        className={styles.timelineBar}
                        style={{
                          left: `${left}px`,
                          width: `${Math.max(width, 4)}px`,
                          backgroundColor: COLORS[index % COLORS.length],
                          opacity:
                            hoveredWork === null || hoveredWork === work.title
                              ? 1
                              : 0.3,
                          filter:
                            hoveredWork === work.title
                              ? 'brightness(1.3)'
                              : 'none',
                          transition: 'opacity 0.2s, filter 0.2s',
                        }}
                      >
                        <span className={styles.timelineBarLabel}>
                          {work.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.monthLabels}>
                {gridLines.map((date, i) => (
                  <div
                    key={i}
                    className={styles.monthLabel}
                    style={{ left: `${toPx(date)}px` }}
                  >
                    {formatGridLabel(date)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 MyApp</p>
      </footer>
    </div>
  );
}
