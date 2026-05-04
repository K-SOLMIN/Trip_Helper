export const DESTINATIONS = [
  { key: null,         countryCode: null, flag: null, label: '전체보기',   city: '',              photo: null },
  { key: '일본',       countryCode: 'JP', flag: 'jp', label: '일본',       city: '도쿄 · 오사카', photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80' },
  { key: '태국',       countryCode: 'TH', flag: 'th', label: '태국',       city: '방콕',          photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&q=80' },
  { key: '프랑스',     countryCode: 'FR', flag: 'fr', label: '프랑스',     city: '파리',          photo: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80' },
  { key: '인도네시아', countryCode: 'ID', flag: 'id', label: '인도네시아', city: '발리',          photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80' },
  { key: '싱가포르',   countryCode: 'SG', flag: 'sg', label: '싱가포르',   city: '마리나베이',    photo: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80' },
  { key: '미국',       countryCode: 'US', flag: 'us', label: '미국',       city: '뉴욕',          photo: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=300&q=80' },
  { key: '영국',       countryCode: 'GB', flag: 'gb', label: '영국',       city: '런던',          photo: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80' },
]

export const COUNTRIES_ORDER = ['일본', '태국', '프랑스', '인도네시아', '싱가포르', '미국', '영국']

const COUNTRY_CODE_BY_KEY = Object.fromEntries(
  DESTINATIONS.filter(d => d.key).map(d => [d.key, d.countryCode])
)

export function getCountryCode(key, fallbackFlag) {
  return COUNTRY_CODE_BY_KEY[key] || fallbackFlag?.toUpperCase() || ''
}

export const MOCK_HOTELS = {
  '일본': [
    { id: 'jp1', name: 'The Peninsula Tokyo',      location: '도쿄 · 마루노우치', rating: 5, price: 450000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: '인기' },
    { id: 'jp2', name: 'Park Hyatt Tokyo',          location: '도쿄 · 신주쿠',     rating: 5, price: 380000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
    { id: 'jp3', name: 'Aman Tokyo',                location: '도쿄 · 오테마치',   rating: 5, price: 620000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
    { id: 'jp4', name: 'Hotel Gracery Shinjuku',    location: '도쿄 · 신주쿠',     rating: 3, price: 120000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
    { id: 'jp5', name: 'Dormy Inn Akihabara',       location: '도쿄 · 아키하바라', rating: 3, price: 95000,  currency: 'KRW', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80', tag: null },
    { id: 'jp6', name: 'The Ritz-Carlton Osaka',    location: '오사카 · 우메다',   rating: 5, price: 410000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&q=80', tag: null },
    { id: 'jp7', name: 'Cross Hotel Osaka',         location: '오사카 · 난바',     rating: 4, price: 155000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80', tag: null },
  ],
  '태국': [
    { id: 'th1', name: 'Mandarin Oriental Bangkok', location: '방콕 · 차오프라야', rating: 5, price: 320000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80', tag: '인기' },
    { id: 'th2', name: 'The Peninsula Bangkok',     location: '방콕 · 차오프라야', rating: 5, price: 280000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'th3', name: 'Capella Bangkok',           location: '방콕 · 차오프라야', rating: 5, price: 490000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'th4', name: 'Centara Grand CentralWorld',location: '방콕 · 시암',       rating: 4, price: 150000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
    { id: 'th5', name: 'ibis Bangkok Sukhumvit',    location: '방콕 · 수쿰빗',     rating: 3, price: 75000,  currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
    { id: 'th6', name: 'Rosewood Bangkok',          location: '방콕 · 플런칫',     rating: 5, price: 420000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80', tag: null },
    { id: 'th7', name: 'Chatrium Hotel Riverside',  location: '방콕 · 야와랏',     rating: 4, price: 130000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
  ],
  '프랑스': [
    { id: 'fr1', name: 'Four Seasons Hotel George V',        location: '파리 · 샹젤리제',           rating: 5, price: 750000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80', tag: '인기' },
    { id: 'fr2', name: 'Le Bristol Paris',                   location: '파리 · 포부르 생토노레',     rating: 5, price: 680000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'fr3', name: 'Hôtel Plaza Athénée',                location: '파리 · 몽테뉴 거리',         rating: 5, price: 820000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&q=80', tag: null },
    { id: 'fr4', name: 'Hotel Lutetia',                      location: '파리 · 생제르맹데프레',      rating: 5, price: 520000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
    { id: 'fr5', name: 'Hôtel du Louvre',                    location: '파리 · 루브르',              rating: 4, price: 280000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
    { id: 'fr6', name: 'Novotel Paris Centre Tour Eiffel',   location: '파리 · 에펠탑',              rating: 4, price: 210000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'fr7', name: 'ibis Paris Gare de Lyon',            location: '파리 · 리옹역',              rating: 3, price: 110000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
  ],
  '인도네시아': [
    { id: 'id1', name: 'Four Seasons Resort Bali at Sayan', location: '발리 · 우붓',   rating: 5, price: 480000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=300&q=80', tag: '인기' },
    { id: 'id2', name: 'COMO Uma Canggu',                   location: '발리 · 짱구',   rating: 5, price: 420000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80', tag: null },
    { id: 'id3', name: 'Alaya Resort Ubud',                 location: '발리 · 우붓',   rating: 5, price: 350000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'id4', name: 'W Bali - Seminyak',                 location: '발리 · 스미냑', rating: 5, price: 390000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'id5', name: 'The Layar Seminyak',                location: '발리 · 스미냑', rating: 4, price: 220000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80', tag: null },
    { id: 'id6', name: 'Aloft Bali Seminyak',               location: '발리 · 스미냑', rating: 4, price: 140000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
    { id: 'id7', name: 'Komaneka at Bisma',                 location: '발리 · 우붓',   rating: 5, price: 560000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
  ],
  '싱가포르': [
    { id: 'sg1', name: 'Marina Bay Sands',                    location: '싱가포르 · 마리나베이', rating: 5, price: 580000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80', tag: '인기' },
    { id: 'sg2', name: 'Capella Singapore',                   location: '싱가포르 · 센토사',     rating: 5, price: 680000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'sg3', name: 'The Fullerton Hotel',                 location: '싱가포르 · CBD',        rating: 5, price: 420000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80', tag: null },
    { id: 'sg4', name: 'Raffles Hotel Singapore',             location: '싱가포르 · 시티홀',     rating: 5, price: 750000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&q=80', tag: null },
    { id: 'sg5', name: 'Pan Pacific Singapore',               location: '싱가포르 · 마리나',     rating: 5, price: 350000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'sg6', name: 'Hotel Indigo Singapore Katong',       location: '싱가포르 · 카통',       rating: 4, price: 210000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
    { id: 'sg7', name: 'ibis Singapore on Bencoolen',         location: '싱가포르 · 부기스',     rating: 3, price: 120000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
  ],
  '미국': [
    { id: 'us1', name: 'The Plaza Hotel',                     location: '뉴욕 · 센트럴파크',       rating: 5, price: 650000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=300&q=80', tag: '인기' },
    { id: 'us2', name: 'The St. Regis New York',              location: '뉴욕 · 미드타운',          rating: 5, price: 580000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'us3', name: 'Four Seasons New York Downtown',      location: '뉴욕 · 로어맨해튼',        rating: 5, price: 720000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
    { id: 'us4', name: 'The High Line Hotel',                 location: '뉴욕 · 첼시',              rating: 4, price: 320000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80', tag: null },
    { id: 'us5', name: 'Arlo NoMad',                          location: '뉴욕 · 노마드',            rating: 4, price: 240000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'us6', name: 'citizenM New York Bowery',            location: '뉴욕 · 로어이스트사이드',  rating: 4, price: 180000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&q=80', tag: null },
    { id: 'us7', name: 'Pod 51 Hotel',                        location: '뉴욕 · 미드타운이스트',    rating: 3, price: 130000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
  ],
  '영국': [
    { id: 'gb1', name: 'The Ritz London',                     location: '런던 · 메이페어',    rating: 5, price: 780000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80', tag: '인기' },
    { id: 'gb2', name: "Claridge's",                          location: '런던 · 메이페어',    rating: 5, price: 850000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', tag: null },
    { id: 'gb3', name: 'The Savoy',                           location: '런던 · 스트랜드',    rating: 5, price: 720000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80', tag: null },
    { id: 'gb4', name: 'The Goring',                          location: '런던 · 빅토리아',    rating: 5, price: 580000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&q=80', tag: null },
    { id: 'gb5', name: 'Ham Yard Hotel',                      location: '런던 · 소호',        rating: 4, price: 350000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', tag: null },
    { id: 'gb6', name: 'citizenM London Tower of London',     location: '런던 · 타워브리지',   rating: 4, price: 220000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300&q=80', tag: null },
    { id: 'gb7', name: 'ibis London Blackfriars',             location: '런던 · 블랙프라이어스', rating: 3, price: 140000, currency: 'KRW', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80', tag: null },
  ],
}
