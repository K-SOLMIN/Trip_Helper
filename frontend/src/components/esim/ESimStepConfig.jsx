import { useState } from 'react'
import Navbar from '../layout/Navbar'
import BottomNav from '../layout/BottomNav'
import CalendarPicker from '../common/CalendarPicker'
import { DAY_PRICES, getDays, getPlans, fmt, genESimCode } from '../../data/esimData'
import { purchaseEsim } from '../../api/esimApi'

export default function ESimStepConfig({ selected, configs, onConfigSet, onBack, onPurchased }) {
  const [activating, setActivating] = useState(null)
  const [modalStep, setModalStep] = useState(null)
  const [tempType, setTempType] = useState('local')
  const [tempStart, setTempStart] = useState('')
  const [tempEnd, setTempEnd] = useState('')
  const [showStartCal, setShowStartCal] = useState(false)
  const [showEndCal, setShowEndCal] = useState(false)
  const [tempPlan, setTempPlan] = useState(null)
  const [email, setEmail] = useState('')
  const [purchasing, setPurchasing] = useState(false)

  const allConfigured = selected.length > 0 && selected.every(c => configs[c.code])
  const totalPrice = selected.reduce((s, c) => s + (configs[c.code]?.plan?.price || 0), 0)

  const openModal = (c) => {
    setActivating(c)
    const existing = configs[c.code]
    setTempType(existing?.type || 'local')
    setTempStart(existing?.start || '')
    setTempEnd(existing?.end || '')
    setTempPlan(existing?.plan || null)
    setModalStep('type')
  }

  const closeModal = () => { setModalStep(null); setActivating(null) }

  const confirmPlan = () => {
    if (!tempPlan) return
    const days = getDays(tempStart, tempEnd)
    onConfigSet(activating.code, { type: tempType, start: tempStart, end: tempEnd, plan: tempPlan, days })
    closeModal()
  }

  const handlePurchase = async () => {
    if (!email) { alert('이메일을 입력해주세요.'); return }
    setPurchasing(true)
    const code = genESimCode()
    try {
      await purchaseEsim({
        email,
        countries: selected.map(c => ({ ...c, config: configs[c.code] })),
        totalPrice,
        code,
      })
    } catch {}
    onPurchased({ code, countries: selected, configs, totalPrice, email })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 64 }}>
      <Navbar />
      <div className="esim-combo-page">
        <button className="esim-back" onClick={onBack}>←</button>
        <h2 className="esim-combo-title">
          가격과 사용 국가를 고려한<br />
          <span className="esim-combo-highlight">최적의 상품 조합</span>이에요
          <span className="esim-combo-info"> ⓘ</span>
        </h2>

        <div className="esim-combo-list">
          {selected.map(c => {
            const cfg = configs[c.code]
            const minPrice = fmt((DAY_PRICES[c.region]?.['300mb'] || 770))
            return (
              <div key={c.code} className="esim-combo-card">
                <div className="esim-combo-row">
                  <div className="esim-combo-check">
                    <div className={`esim-check-circle${cfg ? ' checked' : ''}`}>
                      {cfg && <span>✓</span>}
                    </div>
                  </div>
                  <span className="esim-combo-country-name">{c.flag} {c.name}</span>
                  <span className="esim-combo-price">
                    {cfg ? fmt(cfg.plan.price) : `${minPrice}~`}
                  </span>
                </div>
                {cfg ? (
                  <div className="esim-combo-detail">
                    <span className="esim-combo-summary">
                      {cfg.type === 'local' ? '로컬망' : '로밍망'} / {cfg.days}일 / {cfg.plan.name} / 1개
                    </span>
                    <button className="esim-reselect" onClick={() => openModal(c)}>다시 선택하기</button>
                  </div>
                ) : (
                  <div className="esim-combo-detail">
                    <button className="esim-select-plan" onClick={() => openModal(c)}>플랜 선택하기</button>
                  </div>
                )}
              </div>
            )
          })}
          <div className="esim-best-notice">✓ 가장 합리적인 가격이에요.</div>
        </div>

        <div className="esim-email-section">
          <input
            type="email"
            className="esim-email-input"
            placeholder="eSIM 정보를 받을 이메일 주소"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="esim-combo-footer">
          <button
            className="esim-purchase-btn"
            disabled={!allConfigured || !email || purchasing}
            onClick={handlePurchase}
          >
            {purchasing ? '처리 중...' : `구매하기${totalPrice > 0 ? ` · ${fmt(totalPrice)}` : ''}`}
          </button>
        </div>
      </div>

      {/* 종류 선택 모달 */}
      {activating && modalStep === 'type' && (
        <div className="esim-overlay" onClick={closeModal}>
          <div className="esim-modal" onClick={e => e.stopPropagation()}>
            <button className="esim-modal-x" onClick={closeModal}>×</button>
            <h3 className="esim-modal-title">eSIM 종류를 선택해주세요.</h3>
            <div className="esim-type-options">
              {[
                { key: 'roaming', label: '로밍망', desc: '가격이 합리적이에요', factor: 1.0 },
                { key: 'local',   label: '로컬망', desc: '속도가 빠르고 안정적이에요', factor: 1.1 },
              ].map(({ key, label, desc, factor }) => {
                const baseDay = DAY_PRICES[activating.region]?.['300mb'] || 770
                return (
                  <div
                    key={key}
                    className={`esim-type-opt${tempType === key ? ' selected' : ''}`}
                    onClick={() => setTempType(key)}
                  >
                    <div className="esim-type-label">{label}</div>
                    <div className="esim-type-desc">{desc}</div>
                    <div className="esim-type-price">{fmt(Math.round(baseDay * factor / 10) * 10)}~</div>
                  </div>
                )
              })}
            </div>
            <div className="esim-modal-footer">
              <button className="esim-btn-cancel" onClick={closeModal}>취소</button>
              <button className="esim-btn-next" onClick={() => setModalStep('dates')}>다음</button>
            </div>
          </div>
        </div>
      )}

      {/* 날짜 선택 모달 */}
      {activating && modalStep === 'dates' && (
        <div className="esim-overlay">
          <div className="esim-modal" onClick={e => e.stopPropagation()}>
            <button className="esim-modal-x" onClick={closeModal}>×</button>
            <h3 className="esim-modal-title">
              {activating.name}에<br />얼마 동안 머무시나요?
            </h3>
            <div className="esim-dates">
              <div className="esim-date-row">
                <button className="esim-date-input" onClick={() => setShowStartCal(true)}>
                  {tempStart || '시작 날짜 선택'}
                </button>
                <span className="esim-date-label">부터</span>
              </div>
              <div className="esim-date-row">
                <button className="esim-date-input" onClick={() => setShowEndCal(true)}>
                  {tempEnd || '종료 날짜 선택'}
                </button>
                <span className="esim-date-label">까지 여행해요</span>
              </div>
              {tempStart && tempEnd && getDays(tempStart, tempEnd) > 0 && (
                <div className="esim-nights-label">
                  {getDays(tempStart, tempEnd) - 1}박 {getDays(tempStart, tempEnd)}일
                </div>
              )}
            </div>
            <div className="esim-modal-footer">
              <button className="esim-btn-cancel" onClick={() => setModalStep('type')}>이전</button>
              <button className="esim-btn-next" disabled={!tempStart || !tempEnd} onClick={() => setModalStep('plan')}>다음</button>
            </div>
          </div>
        </div>
      )}

      {showStartCal && (
        <CalendarPicker
          value={tempStart}
          minDate={new Date().toISOString().split('T')[0]}
          onChange={v => { setTempStart(v); if (tempEnd && v > tempEnd) setTempEnd('') }}
          onClose={() => setShowStartCal(false)}
        />
      )}
      {showEndCal && (
        <CalendarPicker
          value={tempEnd}
          minDate={tempStart || new Date().toISOString().split('T')[0]}
          rangeStart={tempStart}
          onChange={setTempEnd}
          onClose={() => setShowEndCal(false)}
        />
      )}

      {/* 플랜 선택 모달 */}
      {activating && modalStep === 'plan' && (
        <div className="esim-overlay">
          <div className="esim-modal esim-modal-tall" onClick={e => e.stopPropagation()}>
            <button className="esim-modal-x" onClick={closeModal}>×</button>
            <h3 className="esim-modal-title">
              {getDays(tempStart, tempEnd)}일 동안<br />사용할 플랜을 골라주세요
            </h3>
            <div className="esim-plans">
              <div className="esim-plans-header">추천 플랜</div>
              {getPlans(activating, tempType, getDays(tempStart, tempEnd)).map(plan => (
                <div
                  key={plan.id}
                  className={`esim-plan-item${tempPlan?.id === plan.id ? ' selected' : ''}`}
                  onClick={() => setTempPlan(plan)}
                >
                  <div>
                    <div className="esim-plan-desc">{plan.desc}</div>
                    <div className="esim-plan-name">{plan.name}</div>
                  </div>
                  <div className="esim-plan-price">{fmt(plan.price)}</div>
                </div>
              ))}
            </div>
            <div className="esim-modal-footer">
              <button className="esim-btn-cancel" onClick={() => setModalStep('dates')}>이전</button>
              <button className="esim-btn-next" disabled={!tempPlan} onClick={confirmPlan}>선택 완료</button>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  )
}
