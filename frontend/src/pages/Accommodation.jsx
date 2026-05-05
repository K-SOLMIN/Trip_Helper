import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import DestinationSearch from '../components/accommodation/DestinationSearch'
import AccomCalendar, { formatKo } from '../components/accommodation/AccomCalendar'
import { DESTINATIONS, getCountryCode } from '../data/mockHotels'
import slide1 from '../assets/hotel_slide_1.jpg'
import slide2 from '../assets/hotel_slide_2.jpg'
import slide3 from '../assets/hotel_slide_3.jpg'
import '../styles/accommodation.css'

const SLIDES = [
  { img: slide1, tag: '리조트', title: ['럭셔리 리조트에서', '프리미엄 휴가를'], sub: '인피니티 풀과 함께하는 완벽한 휴가' },
  { img: slide2, tag: '도시 호텔', title: ['도시의 중심에서', '특별한 하룻밤'], sub: '최고급 호텔에서 즐기는 도심 여행' },
  { img: slide3, tag: '자연 힐링', title: ['자연 속에서', '편안한 여행을'], sub: '일상에서 벗어나는 완벽한 휴식' },
]

function getDefaultDates() {
  const ci = new Date()
  ci.setDate(ci.getDate() + 30)
  const co = new Date(ci)
  co.setDate(co.getDate() + 1)
  const fmt = (d) => d.toISOString().slice(0, 10)
  return { checkIn: fmt(ci), checkOut: fmt(co) }
}

export default function Accommodation() {
  const navigate = useNavigate()
  const [destination,         setDestination]         = useState('')
  const [checkIn,             setCheckIn]             = useState('')
  const [checkOut,            setCheckOut]            = useState('')
  const [adults,              setAdults]              = useState(2)
  const [children,            setChildren]            = useState(0)
  const [selectedCountry,     setSelectedCountry]     = useState(null)
  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [calOpen,             setCalOpen]             = useState(false)
  const [destOpen,            setDestOpen]            = useState(false)
  const [guestOpen,           setGuestOpen]           = useState(false)
  const [slideIdx,            setSlideIdx]            = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlideIdx(i => (i + 1) % SLIDES.length), 4500)
    return () => clearInterval(id)
  }, [])

  const handleSearch = () => {
    if (!selectedCountry && !destination) return
    const defaults = getDefaultDates()
    const params = new URLSearchParams({
      destination: destination || selectedCountry || '',
      countryKey:  selectedCountry || '',
      countryCode: selectedCountryCode || getCountryCode(selectedCountry),
      checkIn:     checkIn  || defaults.checkIn,
      checkOut:    checkOut || defaults.checkOut,
      guests:      String(adults),
      children:    String(children),
    })
    navigate(`/accommodation/results?${params}`)
  }

  const guestLabel = [
    `성인 ${adults}명`,
    children > 0 ? `아동 ${children}명` : '',
  ].filter(Boolean).join(' · ')

  const canSearch = !!(selectedCountry || destination)

  return (
    <div className="ac-page">
      <Navbar />

      {/* 슬라이더 히어로 */}
      <div className="ac-slider">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`ac-slide${i === slideIdx ? ' ac-slide--active' : ''}`}>
            <img src={slide.img} alt="" className="ac-slide-img" />
            <div className="ac-slide-overlay" />
            <div className="ac-slide-content">
              <span className="ac-slide-tag">{slide.tag}</span>
              <h1 className="ac-slide-title">
                {slide.title[0]}<br />{slide.title[1]}
              </h1>
              <p className="ac-slide-sub">{slide.sub}</p>
            </div>
          </div>
        ))}

        <div className="ac-slide-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`ac-slide-dot${i === slideIdx ? ' ac-slide-dot--active' : ''}`}
              onClick={() => setSlideIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* 수평 검색 바 */}
      <div className="ac-search-wrap">
        <div className="ac-search-card">
          <button className="ac-hs-field ac-hs-field--first" onClick={() => setDestOpen(true)}>
            <span className="ac-field-icon">📍</span>
            <div className="ac-field-texts">
              <span className="ac-field-label">여행지</span>
              <span className={`ac-field-value${!destination ? ' placeholder' : ''}`}>
                {destination || '어디 가시나요?'}
              </span>
            </div>
          </button>

          <div className="ac-search-divider" />

          <button className="ac-hs-field" onClick={() => setCalOpen(true)}>
            <span className="ac-field-icon">📅</span>
            <div className="ac-field-texts">
              <span className="ac-field-label">체크인</span>
              <span className={`ac-field-value${!checkIn ? ' placeholder' : ''}`}>
                {checkIn ? formatKo(checkIn) : '연도·월·일'}
              </span>
            </div>
          </button>

          <div className="ac-search-divider" />

          <button className="ac-hs-field" onClick={() => setCalOpen(true)}>
            <span className="ac-field-icon">📅</span>
            <div className="ac-field-texts">
              <span className="ac-field-label">체크아웃</span>
              <span className={`ac-field-value${!checkOut ? ' placeholder' : ''}`}>
                {checkOut ? formatKo(checkOut) : '연도·월·일'}
              </span>
            </div>
          </button>

          <div className="ac-search-divider" />

          {/* 인원 드롭다운 */}
          <div className="ac-guest-wrap">
            <button className="ac-hs-field" onClick={() => setGuestOpen(o => !o)}>
              <span className="ac-field-icon">👤</span>
              <div className="ac-field-texts">
                <span className="ac-field-label">인원</span>
                <span className="ac-field-value">{guestLabel}</span>
              </div>
            </button>

            {guestOpen && (
              <>
                <div className="ac-guest-dimmer" onClick={() => setGuestOpen(false)} />
                <div className="ac-guest-dropdown">
                  <div className="ac-guest-row">
                    <div className="ac-guest-row-info">
                      <span className="ac-guest-row-label">성인</span>
                      <span className="ac-guest-row-sub">만 18세 이상</span>
                    </div>
                    <div className="ac-guests-ctrl">
                      <button className="ac-guest-btn" onClick={() => setAdults(a => Math.max(1, a - 1))}>−</button>
                      <span className="ac-guests-num">{adults}</span>
                      <button className="ac-guest-btn" onClick={() => setAdults(a => a + 1)}>+</button>
                    </div>
                  </div>
                  <div className="ac-guest-row">
                    <div className="ac-guest-row-info">
                      <span className="ac-guest-row-label">청소년/아동</span>
                      <span className="ac-guest-row-sub">만 17세 이하</span>
                    </div>
                    <div className="ac-guests-ctrl">
                      <button className="ac-guest-btn" onClick={() => setChildren(c => Math.max(0, c - 1))}>−</button>
                      <span className="ac-guests-num">{children}</span>
                      <button className="ac-guest-btn" onClick={() => setChildren(c => c + 1)}>+</button>
                    </div>
                  </div>
                  <button className="ac-guest-confirm" onClick={() => setGuestOpen(false)}>확인</button>
                </div>
              </>
            )}
          </div>

          <button
            className={`ac-search-submit${!canSearch ? ' ac-search-submit--dim' : ''}`}
            onClick={() => { setGuestOpen(false); handleSearch() }}
            disabled={!canSearch}
          >
            🔍 검색하기
          </button>
        </div>
      </div>

      {destOpen && (
        <DestinationSearch
          onSelect={(item) => {
            setDestination(item.city)
            setSelectedCountry(item.key)
            setSelectedCountryCode(item.countryCode || getCountryCode(item.key, item.flag))
          }}
          onClose={() => setDestOpen(false)}
        />
      )}

      {calOpen && (
        <AccomCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          onSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co) }}
          onClose={() => setCalOpen(false)}
        />
      )}

      {/* 인기 여행지 */}
      <div className="ac-dest-section">
        <h2 className="ac-dest-title">인기 해외 여행지</h2>
        <div className="ac-dest-scroll">
          {DESTINATIONS.map(dest => (
            <button
              key={dest.label}
              className={`ac-dest-card${selectedCountry === dest.key ? ' ac-dest-card--active' : ''}`}
              onClick={() => {
                setSelectedCountry(dest.key)
                setSelectedCountryCode(dest.countryCode || '')
                setDestination(dest.key ? (dest.city || dest.key) : '')
              }}
            >
              {dest.photo ? (
                <>
                  <img src={dest.photo} alt={dest.label} className="ac-dest-photo" />
                  <div className="ac-dest-overlay" />
                  <div className="ac-dest-info">
                    <div className="ac-dest-flag-wrap">
                      <img
                        src={`https://flagcdn.com/w40/${dest.flag}.png`}
                        alt={dest.label}
                        className="ac-dest-flag-img"
                      />
                    </div>
                    <span className="ac-dest-name">{dest.label}</span>
                    <span className="ac-dest-city">{dest.city}</span>
                  </div>
                </>
              ) : (
                <div className="ac-dest-all-card">
                  <span className="ac-dest-all-icon">🌏</span>
                  <span className="ac-dest-all-text">전체보기</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
