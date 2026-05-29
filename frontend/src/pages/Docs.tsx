/**
 * Docs.tsx
 * 仕様書ページのコンポーネント
 * API仕様・画面仕様をMarkdown形式で表示する
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Docs.module.scss';

export default function Docs() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/spec.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo} onClick={() => navigate('/')}>
          MyApp
        </h1>
      </header>
      <div className={styles.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
