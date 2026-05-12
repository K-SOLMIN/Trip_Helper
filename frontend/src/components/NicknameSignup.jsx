import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../api/config'

export default function NicknameSignup() {
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE}/auth/kakao/complete-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname.trim() }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || '회원가입에 실패했습니다.')
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 20,
        padding: 40,
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h2 style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            color: '#2d3748',
            marginBottom: 8
          }}>
            환영합니다! 👋
          </h2>
          <p style={{
            margin: 0,
            fontSize: 16,
            color: '#718096',
            lineHeight: 1.5
          }}>
            사용하실 닉네임을 입력해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 (2-10자)"
              maxLength={10}
              minLength={2}
              style={{
                width: '100%',
                padding: 15,
                border: '2px solid #e2e8f0',
                borderRadius: 12,
                fontSize: 16,
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: 12,
              background: '#fed7d7',
              border: '1px solid #fc8181',
              borderRadius: 8,
              color: '#c53030',
              fontSize: 14,
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !nickname.trim() || nickname.trim().length < 2}
            style={{
              padding: 15,
              background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: (loading || !nickname.trim() || nickname.trim().length < 2) ? 0.6 : 1
            }}
          >
            {loading ? '처리 중...' : '시작하기'}
          </button>
        </form>

        <div style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 12,
          color: '#a0aec0'
        }}>
          닉네임은 언제든지 변경할 수 있습니다
        </div>
      </div>
    </div>
  )
}
