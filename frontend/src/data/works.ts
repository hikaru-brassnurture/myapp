export interface Work {
  title: string;
  description: string;
  tech: string[];
  startDate: string;
  endDate: string | null;
}

export const works: Work[] = [
  {
    title: 'MyApp',
    description: 'ログイン・データ管理Webアプリ',
    tech: ['React', 'TypeScript', 'Go', 'SQLite'].sort(),
    startDate: '2026-05-24',
    endDate: null,
  },
  {
    title: 'ほふりWebプロジェクト',
    description:
      '金融システムの改修。Web画面のデザイン改修およびJavaを用いたバックエンド改修を担当。',
    tech: ['HTML', 'CSS', 'JavaScript', 'Java'].sort(),
    startDate: '2022-07-01',
    endDate: '2023-10-31',
  },
  {
    title: 'ほふりプロジェクト',
    description:
      'ほふりWebプロジェクトよりサーバーサイドのプロジェクト。既存システムの設計書書き起こしを担当。',
    tech: ['Java', 'C言語'].sort(),
    startDate: '2023-11-01',
    endDate: '2024-03-31',
  },
  {
    title: 'RS-ASKプロジェクト',
    description: '人材派遣システムの改修。主にクライアント側の改修を担当。',
    tech: ['Java', 'JavaScript', 'seaser2', 'Oracle'].sort(),
    startDate: '2024-05-01',
    endDate: '2025-03-31',
  },
  {
    title: 'RS-SOL(WEBアプリ)プロジェクト',
    description: '人材派遣システムの改修。主にスタッフ側の改修を担当。',
    tech: ['Java', 'seasar2', 'Oracle'].sort(),
    startDate: '2025-04-01',
    endDate: '2025-11-31',
  },
  {
    title: 'RS-SOL(クラウド)プロジェクト',
    description:
      '人材派遣システムの改修。スタッフ側とクライアント側両方の改修を担当。',
    tech: ['Java', 'Spring', 'Oracle'].sort(),
    startDate: '2025-12-01',
    endDate: null,
  },
];
