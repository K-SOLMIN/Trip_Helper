// VITE_API_BASE: 백엔드 오리진(주소) 백엔드 주소
// 로컬 개발 환경에서는 비워야함 그래야 Vite가 /api 요청을 백엔드로 프록시
const API_ORIGIN = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

export const API_BASE = `${API_ORIGIN}/api`
