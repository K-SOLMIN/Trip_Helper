// VITE_API_BASE: 백엔드 서버 주소 (예: https://your-app.onrender.com)
// 개발 환경에서는 비워두면 Vite proxy(/api)가 자동으로 처리합니다
export const API_BASE = (import.meta.env.VITE_API_BASE || '') + '/api'
