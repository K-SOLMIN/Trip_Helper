import { useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import BottomNav from '../layout/BottomNav'
import { fmt } from '../../data/esimData'

export default function ESimStepConfirm({ confirmation }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>
      <Navbar />
      <div className="esim-confirm-page">
        <div className="esim-confirm-icon">✅</div>
        <h2 className="esim-confirm-title">eSIM 구매가 완료되었습니다!</h2>
        <p className="esim-confirm-email-notice">
          {confirmation?.email}로 활성화 코드가 발송되었습니다.
        </p>

        <div className="esim-confirm-code-box">
          <div className="esim-confirm-code-label">eSIM 활성화 코드</div>
          <div className="esim-confirm-code-value">{confirmation?.code}</div>
        </div>

        <div className="esim-confirm-countries">
          {confirmation?.countries.map(c => {
            const cfg = confirmation.configs[c.code]
            return (
              <div key={c.code} className="esim-confirm-row">
                <span>{c.flag} {c.name}</span>
                <span className="esim-confirm-row-detail">
                  {cfg.type === 'local' ? '로컬망' : '로밍망'} · {cfg.days}일 · {cfg.plan.name}
                </span>
                <span className="esim-confirm-row-price">{fmt(cfg.plan.price)}</span>
              </div>
            )
          })}
        </div>

        <div className="esim-confirm-total">
          총 결제금액 <strong>{fmt(confirmation?.totalPrice || 0)}</strong>
        </div>

        <div className="esim-confirm-guide">
          <div className="esim-guide-title">eSIM 설치 방법</div>
          <ol className="esim-guide-list">
            <li>기기 설정 → 이동통신 → eSIM 추가</li>
            <li>QR 코드 스캔 또는 위 활성화 코드 수동 입력</li>
            <li>설치 완료 후 여행지 도착 시 자동 연결</li>
          </ol>
        </div>

        <button className="esim-home-btn" onClick={() => navigate('/home')}>홈으로 돌아가기</button>
        <div className="esim-confirm-note">테스트 모드 - 실제 결제가 이루어지지 않습니다</div>
      </div>
      <BottomNav />
    </div>
  )
}
