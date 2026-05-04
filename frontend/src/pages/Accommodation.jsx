import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import DestinationSearch from '../components/accommodation/DestinationSearch'
import AccomCalendar, { formatKo } from '../components/accommodation/AccomCalendar'
import HotelSection from '../components/accommodation/HotelSection'
import { DESTINATIONS, COUNTRIES_ORDER, MOCK_HOTELS, getCountryCode } from '../data/mockHotels'
import { searchStays } from '../api/accommodationApi'
import '../styles/accommodation.css'

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
  const [destination,        setDestination]        = useState('')
  const [checkIn,            setCheckIn]            = useState('')
  const [checkOut,           setCheckOut]           = useState('')
  const [guests,             setGuests]             = useState(2)
  const [selectedCountry,    setSelectedCountry]    = useState(null)
  const [selectedCountryCode,setSelectedCountryCode]= useState('')
  const [calOpen,            setCalOpen]            = useState(false)
  const [destOpen,           setDestOpen]           = useState(false)
  const [liked,              setLiked]              = useState({})
  const [hotelsByCountry,    setHotelsByCountry]    = useState({})
  const [loadingCountries,   setLoadingCountries]   = useState(new Set())

  const toggleLike = (e, id) => { e.stopPropagation(); setLiked(p => ({ ...p, [id]: !p[id] })) }

  const fetchHotels = (ci, co, g) => {
    const defaults = getDefaultDates()
    const resolvedCi = ci || defaults.checkIn
    const resolvedCo = co || defaults.checkOut
    const targets = selectedCountry ? [selectedCountry] : COUNTRIES_ORDER
    setLoadingCountries(new Set(targets))
    targets.forEach(country => {
      searchStays({
        country,
        countryCode: getCountryCode(country),
        checkIn: resolvedCi,
        checkOut: resolvedCo,
        guests: g,
      })
        .then(data => {
          setHotelsByCountry(prev => ({ ...prev, [country]: data }))
          setLoadingCountries(prev => { const s = new Set(prev); s.delete(country); return s })
        })
        .catch(() => {
          setHotelsByCountry(prev => ({ ...prev, [country]: [] }))
          setLoadingCountries(prev => { const s = new Set(prev); s.delete(country); return s })
        })
    })
  }

  useEffect(() => { setHotelsByCountry(MOCK_HOTELS) }, [])

  const handleSearch = () => {
    if (!selectedCountry && !destination) return
    const defaults = getDefaultDates()
    const params = new URLSearchParams({
      destination: destination || selectedCountry || '',
      countryKey:  selectedCountry || '',
      countryCode: selectedCountryCode || getCountryCode(selectedCountry),
      checkIn:     checkIn  || defaults.checkIn,
      checkOut:    checkOut || defaults.checkOut,
      guests:      String(guests),
    })
    navigate(`/accommodation/results?${params}`)
  }

  const dateLabel = (() => {
    if (!checkIn) return '날짜 선택'
    const nights = checkOut
      ? Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)
      : null
    return nights ? `${formatKo(checkIn)} - ${formatKo(checkOut)} (${nights}박)` : formatKo(checkIn)
  })()

  return (
    <div className="ac-page">
      <Navbar />

      {/* 검색 폼 */}
      <div className="ac-search-section">
        <div className="ac-search-inner">
          <button className="ac-search-field ac-field-full" onClick={() => setDestOpen(true)}>
            <span className="ac-field-icon">📍</span>
            <div className="ac-field-texts">
              <span className="ac-field-label">여행지</span>
              <span className={`ac-field-value${!destination ? ' placeholder' : ''}`}>
                {destination || '여행지를 선택해주세요'}
              </span>
            </div>
          </button>

          <div className="ac-search-row2">
            <button className="ac-search-field ac-field-date" onClick={() => setCalOpen(true)}>
              <span className="ac-field-icon">📅</span>
              <div className="ac-field-texts">
                <span className="ac-field-label">입실 · 퇴실</span>
                <span className={`ac-field-value${!checkIn ? ' placeholder' : ''}`}>{dateLabel}</span>
              </div>
            </button>
            <div className="ac-search-divider" />
            <div className="ac-search-field">
              <span className="ac-field-icon">👤</span>
              <div className="ac-field-texts" style={{ flex: 1 }}>
                <span className="ac-field-label">인원</span>
                <span className="ac-field-value">성인 {guests}명</span>
              </div>
              <div className="ac-guests-ctrl">
                <button className="ac-guest-btn" onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
                <span className="ac-guests-num">{guests}</span>
                <button className="ac-guest-btn" onClick={() => setGuests(g => g + 1)}>+</button>
              </div>
            </div>
          </div>

          <button className="ac-search-btn" onClick={handleSearch}>숙소 검색</button>
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

      {/* 여행지 사진 카드 */}
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
              }}
            >
              {dest.photo ? (
                <>
                  <img src={dest.photo} alt={dest.label} className="ac-dest-photo" />
                  <div className="ac-dest-overlay" />
                  <div className="ac-dest-info">
                    <div className="ac-dest-flag-wrap">
                      <img src={`https://flagcdn.com/w40/${dest.flag}.png`} alt={dest.label} className="ac-dest-flag-img" />
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

      {/* 국가별 숙소 섹션 */}
      <div className="ac-hotels-wrap">
        {COUNTRIES_ORDER
          .filter(c => !selectedCountry || c === selectedCountry)
          .map(country => (
            <HotelSection
              key={country}
              country={country}
              hotels={hotelsByCountry[country] || []}
              loading={loadingCountries.has(country)}
              liked={liked}
              onLike={toggleLike}
            />
          ))}
      </div>

      <BottomNav />
    </div>
  )
}
