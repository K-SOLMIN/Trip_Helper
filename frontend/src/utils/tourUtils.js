import { SEARCH_LABELS } from '../data/tourData'

export function getStored(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

export function storeUnique(key, item, getId, limit = 6) {
  const current = getStored(key)
  const next = [item, ...current.filter(v => getId(v) !== getId(item))].slice(0, limit)
  localStorage.setItem(key, JSON.stringify(next))
  return next
}

export function getSearchLabel(value) {
  return SEARCH_LABELS[value] || value
}
