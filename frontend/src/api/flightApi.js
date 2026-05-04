import { API_BASE } from './config'

export async function getPlaces(query) {
  if (!query || query.length < 2) return []
  const r = await fetch(`${API_BASE}/places?query=${encodeURIComponent(query)}`)
  return r.json()
}

export async function searchFlights({ origin, destination, departureDate, returnDate, adults, cabinClass, tripType }) {
  const r = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      origin,
      destination,
      departure_date: departureDate,
      return_date: returnDate || undefined,
      adults: Number(adults),
      cabin_class: cabinClass,
      trip_type: tripType,
    }),
  })
  const data = await r.json()
  if (data.error) throw new Error(data.error)
  return data
}

export async function getOffer(offerId) {
  const r = await fetch(`${API_BASE}/offers/${offerId}`)
  const data = await r.json()
  if (data.error) throw new Error(data.error)
  return data
}

export async function createOrder({ offerId, passengers, services = [] }) {
  const r = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offer_id: offerId, passengers, services }),
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data.error || '예약 처리 중 오류가 발생했습니다')
  return data
}

export async function getOrder(orderId) {
  const r = await fetch(`${API_BASE}/orders/${orderId}`)
  const data = await r.json()
  if (data.error) throw new Error(data.error)
  return data
}

export async function getPopular() {
  const r = await fetch(`${API_BASE}/popular`)
  return r.json()
}
