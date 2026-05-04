import { useState, useMemo } from 'react'
import Navbar from '../layout/Navbar'
import BottomNav from '../layout/BottomNav'
import { COUNTRIES } from '../../data/esimData'

export default function ESimStepCountry({ selected, onToggle, onNext, onBack }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(c => c.name.includes(search.trim()) || c.code.toLowerCase().includes(q))
  }, [search])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 64 }}>
      <Navbar />
      <div className="esim-country-page">
        <button className="esim-back" onClick={onBack}>←</button>
        <h2 className="esim-page-title">여행할 국가를 모두<br />선택해주세요.</h2>

        <div className="esim-country-search">
          <span className="esim-search-icon">🔍</span>
          <input
            className="esim-search-input"
            placeholder="도시, 국가명 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="esim-country-grid">
          {filtered.map(c => {
            const isSelected = !!selected.find(x => x.code === c.code)
            return (
              <button
                key={c.code}
                className={`esim-country-btn${isSelected ? ' esim-country-selected' : ''}`}
                onClick={() => onToggle(c)}
              >
                <img
                  className="esim-flag-img"
                  src={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png`}
                  alt={c.name}
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="esim-country-name">{c.name}</div>
              </button>
            )
          })}
        </div>

        <div className="esim-country-footer">
          <button
            className="esim-next-btn"
            disabled={selected.length === 0}
            onClick={onNext}
          >
            다음 {selected.length > 0 ? `(${selected.length}개 선택)` : ''}
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
