export const DEFAULT_TOUR_QUERY = 'Osaka tourist attractions'
export const SEARCH_PLACEHOLDER = '원하는 나라나 명소를 입력해주세요!!'

export const POPULAR_DESTS = [
  { label: '오사카',   query: 'Osaka tourist attractions',    icon: '🏯' },
  { label: '후쿠오카', query: 'Fukuoka tourist attractions',  icon: '⛩️' },
  { label: '파리',     query: 'Paris tourist attractions',    icon: '🗼' },
  { label: '로마',     query: 'Rome tourist attractions',     icon: '🏛️' },
  { label: '싱가포르', query: 'Singapore attractions',        icon: '🌆' },
  { label: '하와이',   query: 'Hawaii attractions',           icon: '🌴' },
  { label: '뉴욕',     query: 'New York tourist attractions', icon: '🗽' },
]

export const HEROES = [
  {
    label: '하와이',
    title: '하와이 인기투어',
    sub: '해변, 전망대, 가족 여행지까지',
    query: 'Hawaii attractions',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
  },
  {
    label: '파리',
    title: '파리 랜드마크',
    sub: '예약 권장 명소를 한 번에',
    query: 'Paris museums landmarks',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80',
  },
  {
    label: '오사카',
    title: '오사카 BEST',
    sub: '테마파크와 야경 명소',
    query: 'Osaka tourist attractions',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=900&q=80',
  },
]

export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&q=80',
]

export const SEARCH_LABELS = {
  'Osaka tourist attractions':     '오사카',
  'Fukuoka tourist attractions':   '후쿠오카',
  'Paris tourist attractions':     '파리',
  'Paris museums landmarks':       '파리',
  'Rome tourist attractions':      '로마',
  'Singapore attractions':         '싱가포르',
  'Hawaii attractions':            '하와이',
  'New York tourist attractions':  '뉴욕',
}

export const SORT_OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'rating',  label: '평점순' },
  { value: 'reviews', label: '리뷰 많은순' },
]

export const FILTER_OPTIONS = [
  { value: 'reservation', label: '예약 권장' },
  { value: 'paid',        label: '입장료 있음' },
  { value: 'free',        label: '무료 가능' },
  { value: 'open',        label: '현재 영업중' },
  { value: 'rated',       label: '평점 있음' },
]
