@echo off
echo バックエンドを起動中...
start "Backend" cmd /k "cd /d %~dp0backend && go run ./cmd/server"

echo フロントエンドを起動中...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo 起動完了！
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173