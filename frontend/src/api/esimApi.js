import { apiPost } from './apiClient'

export async function purchaseEsim({ email, countries, totalPrice, code }) {
  return apiPost('/esim/purchase', { email, countries, totalPrice, code })
}
