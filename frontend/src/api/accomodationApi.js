import { API_BASE } from './config'

export async function searchStays({ country, checkIn, checkOut, guests }) {
  const r = await fetch(`${API_BASE}/stays/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country, checkIn, checkOut, guests }),
  })
  const data = await r.json()
  if (data.error) throw new Error(data.error)
  return Array.isArray(data) ? data : []
}

export async function getStayDetail(hotelId) {
  const r = await fetch(`${API_BASE}/stays/${hotelId}`)
  const data = await r.json()
  if (data.error) throw new Error(data.error)
  return data
}

export async function getMapEmbedUrl({ query, lat, lng }) {
  const params = new URLSearchParams({ query })
  if (lat != null) params.set('lat', String(lat))
  if (lng != null) params.set('lng', String(lng))
  const r = await fetch(`${API_BASE}/maps/embed-url?${params}`)
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || '지도를 불러오지 못했습니다.')
  return data
}

export async function createStayBooking(payload) {
  const r = await fetch(`${API_BASE}/stays/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || '숙소 예약 처리 중 오류가 발생했습니다')
  return data
}
