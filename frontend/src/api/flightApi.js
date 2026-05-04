import { apiGet, apiPost } from './apiClient'

export async function getPlaces(query) {
  if (!query || query.length < 2) return []
  return apiGet(`/places?query=${encodeURIComponent(query)}`)
}

export async function searchFlights({ origin, destination, departureDate, returnDate, adults, cabinClass, tripType }) {
  return apiPost('/search', {
    origin,
    destination,
    departure_date: departureDate,
    return_date: returnDate || undefined,
    adults: Number(adults),
    cabin_class: cabinClass,
    trip_type: tripType,
  })
}

export async function getOffer(offerId) {
  return apiGet(`/offers/${offerId}`)
}

export async function createOrder({ offerId, passengers, services = [] }) {
  return apiPost('/orders', { offer_id: offerId, passengers, services }, {
    errorMessage: '예약 처리 중 오류가 발생했습니다',
  })
}

export async function getOrder(orderId) {
  return apiGet(`/orders/${orderId}`)
}

export async function getPopular() {
  return apiGet('/popular')
}
