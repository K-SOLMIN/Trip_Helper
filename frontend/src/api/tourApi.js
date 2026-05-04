import { API_BASE } from './config'

export async function searchTours(query, pageToken = '') {
  const params = new URLSearchParams({
    query: query || 'Tokyo tourist attractions',
  })
  if (pageToken) params.set('pageToken', pageToken)

  const r = await fetch(`${API_BASE}/tours/search?${params.toString()}`)
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || '투어 정보를 불러오지 못했습니다')
  return data
}

export async function getTourDetail(placeId) {
  const r = await fetch(`${API_BASE}/tours/${encodeURIComponent(placeId)}`)
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || '투어 상세 정보를 불러오지 못했습니다')
  return data
}
