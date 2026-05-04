import { API_BASE } from './config'

export async function purchaseEsim({ email, countries, totalPrice, code }) {
  const r = await fetch(`${API_BASE}/esim/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, countries, totalPrice, code }),
  })
  return r.json()
}
