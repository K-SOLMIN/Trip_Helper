import { useState, useRef, useEffect } from 'react'
import { DEST_DATA, POPULAR_REGIONS } from '../../data/destinations'

function highlightMatch(text, query) {
  if (!query) return text
  const idx = text.indexOf(query)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="ac-ds-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function DestinationSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ac_recent') || '[]') } catch { return [] }
  })
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const filtered = query.trim()
    ? DEST_DATA.filter(d => d.city.includes(query.trim()))
    : []

  const handleSelect = (item) => {
    const next = [item, ...recent.filter(r => r.city !== item.city)].slice(0, 5)
    localStorage.setItem('ac_recent', JSON.stringify(next))
    setRecent(next)
    onSelect(item)
    onClose()
  }

  const clearRecent = () => {
    localStorage.removeItem('ac_recent')
    setRecent([])
  }

  return (
    <div className="ac-ds-overlay" onClick={onClose}>
      <div className="ac-ds-panel" onClick={e => e.stopPropagation()}>

        <div className="ac-ds-input-row">
          <span className="ac-ds-icon">🔍</span>
          <input
            ref={inputRef}
            className="ac-ds-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="여행지나 숙소명 검색"
          />
          {query && (
            <button className="ac-ds-clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>

        <div className="ac-ds-body">
          {query.trim() === '' ? (
            <>
              {recent.length > 0 && (
                <div className="ac-ds-section">
                  <div className="ac-ds-section-hd">
                    <span className="ac-ds-section-title">최근 검색</span>
                    <button className="ac-ds-delete-all" onClick={clearRecent}>전체 삭제</button>
                  </div>
                  {recent.map((item, i) => (
                    <button key={i} className="ac-ds-recent-item" onClick={() => handleSelect(item)}>
                      <span className="ac-ds-recent-icon">🔍</span>
                      <span className="ac-ds-recent-city">{item.city}</span>
                      <span className="ac-ds-recent-sub">{item.display}</span>
                      <span className="ac-ds-recent-arrow">↗</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="ac-ds-section">
                <div className="ac-ds-section-hd">
                  <span className="ac-ds-section-title">인기 지역</span>
                </div>
                <div className="ac-ds-pills">
                  {POPULAR_REGIONS.map(p => (
                    <button key={p.city} className="ac-ds-pill" onClick={() => handleSelect(p)}>
                      <img src={`https://flagcdn.com/w20/${p.flag}.png`} alt="" className="ac-ds-pill-flag" />
                      {p.city}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : filtered.length === 0 ? (
            <p className="ac-ds-empty">검색 결과가 없습니다.</p>
          ) : (
            <div className="ac-ds-results">
              {filtered.map((item, i) => (
                <button key={i} className="ac-ds-result-item" onClick={() => handleSelect(item)}>
                  <img src={`https://flagcdn.com/w20/${item.flag}.png`} alt="" className="ac-ds-result-flag" />
                  <div className="ac-ds-result-text">
                    <span className="ac-ds-result-city">{highlightMatch(item.city, query.trim())}</span>
                    <span className="ac-ds-result-country">{item.display}</span>
                  </div>
                  <span className="ac-ds-result-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
