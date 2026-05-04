import { apiGet } from './apiClient'

export async function searchTours(query, pageToken = '') {
  const params = new URLSearchParams({
    query: query || 'Tokyo tourist attractions',
  })
  if (pageToken) params.set('pageToken', pageToken)

  return apiGet(`/tours/search?${params.toString()}`, {
    errorMessage: '투어 정보를 불러오지 못했습니다',
  })
}

export async function getTourDetail(placeId) {
  return apiGet(`/tours/${encodeURIComponent(placeId)}`, {
    errorMessage: '투어 상세 정보를 불러오지 못했습니다',
  })
}
