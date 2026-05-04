import { useRef } from 'react'
import { DESTINATIONS } from '../../data/mockHotels'
import { formatKrwPrice } from '../../utils/currency'

export default function HotelSection({ country, hotels, loading, liked, onLike }) {
  const scrollRef = useRef(null)
  const dest = DESTINATIONS.find(d => d.key === country)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * scrollRef.current.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="ac-hsection">
      <div className="ac-hsection-hd">
        <div className="ac-hsection-title-row">
          {dest?.flag && (
            <img src={`https://flagcdn.com/w20/${dest.flag}.png`} alt={country} className="ac-hsection-flag" />
          )}
          <span className="ac-hsection-title">{country} 인기 숙소</span>
        </div>
        <div className="ac-arrow-group">
          <button className="ac-arrow-btn" onClick={() => scroll(-1)}>‹</button>
          <button className="ac-arrow-btn" onClick={() => scroll(1)}>›</button>
        </div>
      </div>

      <div className="ac-hotel-scroll" ref={scrollRef}>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="ac-hotel-card ac-hotel-card--skeleton">
              <div className="ac-skeleton-img" />
              <div className="ac-hotel-body">
                <div className="ac-skeleton-line ac-skeleton-line--short" />
                <div className="ac-skeleton-line" />
                <div className="ac-skeleton-line ac-skeleton-line--short" />
              </div>
            </div>
          ))
        ) : hotels.length === 0 ? (
          <p className="ac-no-results">검색 결과가 없습니다.</p>
        ) : (
          hotels.map(hotel => (
            <div key={hotel.id} className="ac-hotel-card">
              <div className="ac-hotel-img-wrap">
                {hotel.image
                  ? <img src={hotel.image} alt={hotel.name} className="ac-hotel-img" />
                  : <div className="ac-hotel-img ac-hotel-img--placeholder" />}
                {hotel.tag && <span className="ac-hotel-tag">{hotel.tag}</span>}
                <button className="ac-like-btn" onClick={e => onLike(e, hotel.id)}>
                  {liked[hotel.id] ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="ac-hotel-body">
                <p className="ac-hotel-location">{hotel.location}</p>
                <p className="ac-hotel-name">{hotel.name}</p>
                {hotel.rating != null && (
                  <div className="ac-hotel-rating">
                    <span className="ac-stars">{'★'.repeat(Math.min(5, Math.floor(hotel.rating)))}</span>
                    <span className="ac-rating-num">{hotel.rating}</span>
                  </div>
                )}
                <div className="ac-hotel-price">
                  <span className="ac-price-amt">{formatKrwPrice(hotel.price, hotel.currency)}</span>
                  <span className="ac-price-unit">/1박</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
