import { useState } from 'react'
import Navbar from '../layout/Navbar'
import BottomNav from '../layout/BottomNav'

export default function ESimStepLanding({ onNext }) {
  const [showDeviceModal, setShowDeviceModal] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>
      <Navbar />
      <div className="esim-landing">
        <div className="esim-landing-notice">
          <span className="esim-notice-icon">ⓘ</span>
          잠깐! 이용 가능 기기인가요?
          <span className="esim-notice-link" onClick={() => setShowDeviceModal(true)}>이용 가능 기기 →</span>
        </div>

        <div className="esim-landing-hero">
          <h1 className="esim-landing-title">간편 이심</h1>
          <div className="esim-landing-card">
            <p className="esim-landing-sub">1분 만에 나에게 맞는<br />eSIM을 찾아보세요</p>
            <div className="esim-chip-visual">
              <div className="esim-chip-icon">📱</div>
              <div className="esim-chip-badge">eSIM</div>
            </div>
            <button className="esim-start-btn" onClick={onNext}>나에게 맞는 eSIM 찾기</button>
          </div>
        </div>

        <div className="esim-features-section">
          <h2 className="esim-features-title">왜 eSIM은 폰가이즈일까요?</h2>
          <div className="esim-features-list">
            {[
              ['📞', '문제상황 완벽대응', '24시간 안심 고객센터'],
              ['🔄', '제품 결함시', '100% 환불 보장'],
              ['📶', '끊김없는 데이터', '뛰어난 데이터 안정성'],
              ['🎁', '센스있는 여행 선물', '간편한 선물하기 기능'],
            ].map(([icon, sub, main]) => (
              <div key={main} className="esim-feature-item">
                <div className="esim-feature-icon">{icon}</div>
                <div>
                  <div className="esim-feature-sub">{sub}</div>
                  <div className="esim-feature-main">{main}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="esim-features-note">실제 판매되는 eSIM이 아닙니다.</p>
        </div>
      </div>

      {showDeviceModal && (
        <div className="esim-overlay" onClick={() => setShowDeviceModal(false)}>
          <div className="esim-modal esim-device-modal" onClick={e => e.stopPropagation()}>
            <div className="esim-device-header">
              <span className="esim-device-title">이용 가능 기기</span>
              <button className="esim-modal-x" style={{ position: 'static', fontSize: 20 }} onClick={() => setShowDeviceModal(false)}>×</button>
            </div>

            <div className="esim-device-section">
              <div className="esim-device-brand">Samsung</div>
              <ul className="esim-device-list">
                <li>Z Fold 7, Z Flip 7, Z Fold 6, Z Flip 6, Z Fold 5, Z Fold 4, Z Flip 4</li>
                <li>S23 Series, S24 Series, S25 Series</li>
              </ul>
            </div>

            <div className="esim-device-section">
              <div className="esim-device-brand">Apple</div>
              <ul className="esim-device-list">
                <li>iPhone XR, iPhone XS, iPhone XS Max</li>
                <li>iPhone SE (2세대), iPhone SE (3세대)</li>
                <li>iPhone 11 Series, iPhone 12 Series, iPhone 13 Series, iPhone 14 Series, iPhone 15 Series, iPhone 16 Series, iPhone 17 Series</li>
              </ul>
            </div>

            <div className="esim-device-note">
              출시 국가가 중국 본토, 홍콩, 마카오인 기기는 eSIM을 지원하지 않아요. (단, iPhone 13 Mini, iPhone 12 Mini, iPhone SE 2020 및 iPhone XS는 지원됨)
            </div>

            <div className="esim-device-check-section">
              <div className="esim-device-brand" style={{ marginBottom: 10 }}>가능한 기종인지 확인하기</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                · 전화 키패드 &gt; *#06# 입력 &gt; "EID"가 있다면 사용 가능!
              </div>
              <div className="esim-dialpad-demo">
                <div className="esim-dialpad-display">*#06#</div>
                <div className="esim-dialpad-eid">
                  <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>EID</div>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#374151' }}>89283244153534542342342342323234235</div>
                  <div style={{ marginTop: 6, fontSize: 18, letterSpacing: 6, color: '#374151' }}>▌▌▌▌ ▌▌ ▌▌▌▌▌▌▌▌▌</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  )
}
