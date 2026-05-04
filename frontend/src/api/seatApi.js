import { API_BASE } from './config'

export async function getSeatMaps(offerId) {
  const r = await fetch(`${API_BASE}/seat-maps/${offerId}`)
  const data = await r.json()
  if (data && data.error) throw new Error(data.error)
  return Array.isArray(data) ? data : []
}
