export const COUNTRIES = [
  { code: 'JP', name: '일본',             flag: '🇯🇵', region: 'asia' },
  { code: 'US', name: '미국',             flag: '🇺🇸', region: 'americas' },
  { code: 'VN', name: '베트남',           flag: '🇻🇳', region: 'asia' },
  { code: 'TH', name: '태국',             flag: '🇹🇭', region: 'asia' },
  { code: 'TW', name: '대만',             flag: '🇹🇼', region: 'asia' },
  { code: 'CN', name: '중국',             flag: '🇨🇳', region: 'china' },
  { code: 'FR', name: '프랑스',           flag: '🇫🇷', region: 'europe' },
  { code: 'PH', name: '필리핀',           flag: '🇵🇭', region: 'asia' },
  { code: 'GU', name: '괌',               flag: '🇬🇺', region: 'oceania' },
  { code: 'GR', name: '그리스',           flag: '🇬🇷', region: 'europe' },
  { code: 'NL', name: '네덜란드',         flag: '🇳🇱', region: 'europe' },
  { code: 'NO', name: '노르웨이',         flag: '🇳🇴', region: 'europe' },
  { code: 'NZ', name: '뉴질랜드',         flag: '🇳🇿', region: 'oceania' },
  { code: 'DK', name: '덴마크',           flag: '🇩🇰', region: 'europe' },
  { code: 'DE', name: '독일',             flag: '🇩🇪', region: 'europe' },
  { code: 'LV', name: '라트비아',         flag: '🇱🇻', region: 'europe' },
  { code: 'RU', name: '러시아',           flag: '🇷🇺', region: 'europe' },
  { code: 'RO', name: '루마니아',         flag: '🇷🇴', region: 'europe' },
  { code: 'LU', name: '룩셈부르크',       flag: '🇱🇺', region: 'europe' },
  { code: 'LT', name: '리투아니아',       flag: '🇱🇹', region: 'europe' },
  { code: 'LI', name: '리히텐슈타인',     flag: '🇱🇮', region: 'europe' },
  { code: 'MO', name: '마카오',           flag: '🇲🇴', region: 'asia' },
  { code: 'MY', name: '말레이시아',       flag: '🇲🇾', region: 'asia' },
  { code: 'ME', name: '몬테네그로',       flag: '🇲🇪', region: 'europe' },
  { code: 'MT', name: '몰타',             flag: '🇲🇹', region: 'europe' },
  { code: 'BE', name: '벨기에',           flag: '🇧🇪', region: 'europe' },
  { code: 'BY', name: '벨라루스',         flag: '🇧🇾', region: 'europe' },
  { code: 'BA', name: '보스니아 헤르체고비나', flag: '🇧🇦', region: 'europe' },
  { code: 'MK', name: '북마케도니아',     flag: '🇲🇰', region: 'europe' },
  { code: 'BG', name: '불가리아',         flag: '🇧🇬', region: 'europe' },
  { code: 'MP', name: '사이판',           flag: '🇲🇵', region: 'oceania' },
  { code: 'SA', name: '사우디아라비아',   flag: '🇸🇦', region: 'mideast' },
  { code: 'RS', name: '세르비아',         flag: '🇷🇸', region: 'europe' },
  { code: 'SE', name: '스웨덴',           flag: '🇸🇪', region: 'europe' },
  { code: 'CH', name: '스위스',           flag: '🇨🇭', region: 'europe' },
  { code: 'ES', name: '스페인',           flag: '🇪🇸', region: 'europe' },
  { code: 'SK', name: '슬로바키아',       flag: '🇸🇰', region: 'europe' },
  { code: 'SI', name: '슬로베니아',       flag: '🇸🇮', region: 'europe' },
  { code: 'SG', name: '싱가포르',         flag: '🇸🇬', region: 'asia' },
  { code: 'IS', name: '아이슬란드',       flag: '🇮🇸', region: 'europe' },
  { code: 'AE', name: '아랍에미리트',     flag: '🇦🇪', region: 'mideast' },
  { code: 'GB', name: '영국',             flag: '🇬🇧', region: 'europe' },
  { code: 'AT', name: '오스트리아',       flag: '🇦🇹', region: 'europe' },
  { code: 'AU', name: '호주',             flag: '🇦🇺', region: 'oceania' },
  { code: 'IT', name: '이탈리아',         flag: '🇮🇹', region: 'europe' },
  { code: 'ID', name: '인도네시아',       flag: '🇮🇩', region: 'asia' },
  { code: 'IN', name: '인도',             flag: '🇮🇳', region: 'asia' },
  { code: 'IL', name: '이스라엘',         flag: '🇮🇱', region: 'mideast' },
  { code: 'EG', name: '이집트',           flag: '🇪🇬', region: 'africa' },
  { code: 'PT', name: '포르투갈',         flag: '🇵🇹', region: 'europe' },
  { code: 'PL', name: '폴란드',           flag: '🇵🇱', region: 'europe' },
  { code: 'FI', name: '핀란드',           flag: '🇫🇮', region: 'europe' },
  { code: 'HU', name: '헝가리',           flag: '🇭🇺', region: 'europe' },
  { code: 'HK', name: '홍콩',             flag: '🇭🇰', region: 'asia' },
  { code: 'HR', name: '크로아티아',       flag: '🇭🇷', region: 'europe' },
  { code: 'CZ', name: '체코',             flag: '🇨🇿', region: 'europe' },
  { code: 'CA', name: '캐나다',           flag: '🇨🇦', region: 'americas' },
  { code: 'KH', name: '캄보디아',         flag: '🇰🇭', region: 'asia' },
  { code: 'TR', name: '튀르키예',         flag: '🇹🇷', region: 'mideast' },
  { code: 'MX', name: '멕시코',           flag: '🇲🇽', region: 'americas' },
  { code: 'ZA', name: '남아프리카공화국', flag: '🇿🇦', region: 'africa' },
  { code: 'MM', name: '미얀마',           flag: '🇲🇲', region: 'asia' },
].filter((c, i, arr) => arr.findIndex(x => x.code === c.code) === i)

export const DAY_PRICES = {
  asia:     { unlimited: 4300, '1gb': 1400, '500mb': 1050, '300mb': 770 },
  china:    { unlimited: 8800, '1gb': 3000, '500mb': 2200, '300mb': 1600 },
  oceania:  { unlimited: 6200, '1gb': 2100, '500mb': 1550, '300mb': 1100 },
  europe:   { unlimited: 10500, '1gb': 3600, '500mb': 2600, '300mb': 1900 },
  americas: { unlimited: 8200, '1gb': 2900, '500mb': 2100, '300mb': 1500 },
  mideast:  { unlimited: 7200, '1gb': 2500, '500mb': 1800, '300mb': 1300 },
  africa:   { unlimited: 8500, '1gb': 2900, '500mb': 2100, '300mb': 1500 },
}

export function getDays(start, end) {
  if (!start || !end) return 0
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1)
}

export function getPlans(country, type, days) {
  const p = DAY_PRICES[country.region] || DAY_PRICES.asia
  const f = type === 'local' ? 1.1 : 1.0
  const round = (v) => Math.round(v * f * days / 100) * 100
  return [
    { id: 'unlimited', name: '무제한',                    desc: '마음껏 자유롭게 쓰고 싶다면',    price: round(p.unlimited) },
    { id: '1gb',       name: '매일 1GB 이후 속도 저하',   desc: '지도·간단한 검색 위주라면',       price: round(p['1gb']) },
    { id: '500mb',     name: '매일 500MB 이후 속도 저하', desc: '지도·검색만 이용한다면',          price: round(p['500mb']) },
    { id: '300mb',     name: '매일 300MB 이후 속도 저하', desc: '적당한 데이터 사용에 적합해요',   price: round(p['300mb']) },
  ]
}

export const fmt = (n) => n.toLocaleString('ko-KR') + '원'

export const fmtDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${y}년 ${m}월 ${day}일`
}

export function genESimCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${seg()}-${seg()}-${seg()}-${seg()}`
}
