import { apiGet } from './apiClient'

export async function getSeatMaps(offerId) {
  const data = await apiGet(`/seat-maps/${offerId}`)
  return Array.isArray(data) ? data : []
}
