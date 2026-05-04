const KRW_RATES = {
  KRW: 1,
  USD: 1400,
  EUR: 1600,
  GBP: 1850,
  JPY: 9.5,
  CNY: 195,
  HKD: 180,
  TWD: 44,
  THB: 40,
  SGD: 1050,
  IDR: 0.09,
  MYR: 300,
  PHP: 24,
  VND: 0.055,
  INR: 17,
  TRY: 45,
  AED: 380,
  AUD: 920,
  CAD: 1020,
  CHF: 1750,
}

export function toKrw(amount, currency = 'KRW') {
  const num = Number(amount)
  if (!Number.isFinite(num)) return 0
  const rate = KRW_RATES[String(currency || 'KRW').toUpperCase()] || 1
  return num * rate
}

export function formatKrwPrice(amount, currency = 'KRW') {
  const krw = toKrw(amount, currency)
  if (!krw) return '요금 확인'
  const rounded = krw >= 10000 ? Math.round(krw / 100) * 100 : Math.round(krw)
  return `${rounded.toLocaleString('ko-KR')}원`
}
