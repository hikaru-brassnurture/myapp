# MyApp 仕様書

## 目次

- [API仕様](#api仕様)
- [画面仕様](#画面仕様)

---

## API仕様

### 認証不要

#### POST /api/auth/register

ユーザー登録。

**リクエスト**

```json
{
  "name": "string（必須）",
  "email": "string（必須・メール形式）",
  "password": "string（必須・8文字以上）"
}
```

**レスポンス**

- `201 Created`

```json
{
  "token": "JWTトークン",
  "user": {
    "id": 1,
    "name": "山田太郎",
    "email": "example@example.com",
    "created_at": "2026-05-01T00:00:00Z"
  }
}
```

- `400 Bad Request` - バリデーションエラー
- `409 Conflict` - メールアドレス重複

---

#### POST /api/auth/login

ログイン。

**リクエスト**

```json
{
  "email": "string（必須・メール形式）",
  "password": "string（必須）"
}
```

**レスポンス**

- `200 OK`

```json
{
  "token": "JWTトークン",
  "user": {
    "id": 1,
    "name": "山田太郎",
    "email": "example@example.com",
    "created_at": "2026-05-01T00:00:00Z"
  }
}
```

- `400 Bad Request` - バリデーションエラー
- `401 Unauthorized` - 認証失敗

---

### 認証必要（Authorization: Bearer {token}）

#### GET /api/me

ログイン中のユーザー情報を取得。

**レスポンス**

- `200 OK`

```json
{
  "id": 1,
  "name": "山田太郎",
  "email": "example@example.com",
  "created_at": "2026-05-01T00:00:00Z"
}
```

- `401 Unauthorized` - トークン不正・期限切れ

---

#### PUT /api/me

ユーザー名を更新。

**リクエスト**

```json
{
  "name": "string（必須）"
}
```

**レスポンス**

- `200 OK` - 更新後のユーザー情報
- `400 Bad Request` - バリデーションエラー
- `401 Unauthorized` - トークン不正・期限切れ

---

#### PUT /api/me/password

パスワードを変更。

**リクエスト**

```json
{
  "current_password": "string（必須）",
  "new_password": "string（必須・8文字以上）"
}
```

**レスポンス**

- `200 OK`

```json
{
  "message": "パスワードを変更しました"
}
```

- `400 Bad Request` - バリデーションエラー
- `401 Unauthorized` - 現在のパスワードが不正

---

#### PUT /api/me/email

メールアドレスを変更。

**リクエスト**

```json
{
  "new_email": "string（必須・メール形式）",
  "current_password": "string（必須）"
}
```

**レスポンス**

- `200 OK`

```json
{
  "message": "メールアドレスを変更しました"
}
```

- `400 Bad Request` - バリデーションエラー
- `401 Unauthorized` - パスワードが不正
- `409 Conflict` - メールアドレス重複

---

## 画面仕様

### トップページ（/）

ポートフォリオのトップページ。

**機能**

- スキル一覧の表示（カテゴリ別）
- スキルタグによる制作物のフィルタリング（複数選択可）
- 制作物一覧の表示
- タイムライン表示（スケール切り替え：1ヶ月・3ヶ月・6ヶ月・1年）
- ログイン・新規登録ボタン

**画面遷移**

- ログインボタン → `/login`
- 新規登録ボタン → `/register`

---

### ログインページ（/login）

**機能**

- メールアドレス・パスワードでログイン
- ログイン済みの場合は `/dashboard` にリダイレクト

**画面遷移**

- ログイン成功 → `/dashboard`
- 新規登録リンク → `/register`

---

### 新規登録ページ（/register）

**機能**

- 名前・メールアドレス・パスワードでアカウント作成
- ログイン済みの場合は `/dashboard` にリダイレクト

**画面遷移**

- 登録成功 → `/dashboard`
- ログインリンク → `/login`

---

### ダッシュボード（/dashboard）

ログイン必須。未ログインの場合は `/login` にリダイレクト。

**機能**

- ユーザー情報の表示（名前・メールアドレス・登録日）
- ユーザー名の編集
- ログアウト

**画面遷移**

- MyAppロゴ → `/`
- パスワード変更ボタン → `/change-password`
- メールアドレス変更ボタン → `/change-email`
- ログアウト → `/login`

---

### パスワード変更ページ（/change-password）

ログイン必須。未ログインの場合は `/login` にリダイレクト。

**機能**

- 現在のパスワードを確認したうえで新しいパスワードに変更
- 新しいパスワードの確認入力（一致チェック・8文字以上チェック）
- 変更成功後、1.5秒後に `/dashboard` に遷移

---

### メールアドレス変更ページ（/change-email）

ログイン必須。未ログインの場合は `/login` にリダイレクト。

**機能**

- 現在のパスワードを確認したうえで新しいメールアドレスに変更
- 変更成功後、1.5秒後に `/dashboard` に遷移
