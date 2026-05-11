'use strict';

const COUNTRIES = [
  { nameKo: '일본', nameEn: 'Japan', iso2: 'JP', iso3: 'JPN', currency: 'JPY' },
  { nameKo: '태국', nameEn: 'Thailand', iso2: 'TH', iso3: 'THA', currency: 'THB' },
  { nameKo: '베트남', nameEn: 'Vietnam', iso2: 'VN', iso3: 'VNM', currency: 'VND' },
  { nameKo: '싱가포르', nameEn: 'Singapore', iso2: 'SG', iso3: 'SGP', currency: 'SGD' },
  { nameKo: '인도네시아', nameEn: 'Indonesia', iso2: 'ID', iso3: 'IDN', currency: 'IDR' },
  { nameKo: '대만', nameEn: 'Taiwan', iso2: 'TW', iso3: 'TWN', currency: 'TWD' },
  { nameKo: '홍콩', nameEn: 'Hong Kong', iso2: 'HK', iso3: 'HKG', currency: 'HKD' },
  { nameKo: '말레이시아', nameEn: 'Malaysia', iso2: 'MY', iso3: 'MYS', currency: 'MYR' },
  { nameKo: '필리핀', nameEn: 'Philippines', iso2: 'PH', iso3: 'PHL', currency: 'PHP' },
  { nameKo: '프랑스', nameEn: 'France', iso2: 'FR', iso3: 'FRA', currency: 'EUR' },
  { nameKo: '이탈리아', nameEn: 'Italy', iso2: 'IT', iso3: 'ITA', currency: 'EUR' },
  { nameKo: '스페인', nameEn: 'Spain', iso2: 'ES', iso3: 'ESP', currency: 'EUR' },
  { nameKo: '영국', nameEn: 'United Kingdom', iso2: 'GB', iso3: 'GBR', currency: 'GBP' },
  { nameKo: '독일', nameEn: 'Germany', iso2: 'DE', iso3: 'DEU', currency: 'EUR' },
  { nameKo: '체코', nameEn: 'Czech Republic', iso2: 'CZ', iso3: 'CZE', currency: 'CZK' },
  { nameKo: '포르투갈', nameEn: 'Portugal', iso2: 'PT', iso3: 'PRT', currency: 'EUR' },
  { nameKo: '그리스', nameEn: 'Greece', iso2: 'GR', iso3: 'GRC', currency: 'EUR' },
  { nameKo: '스위스', nameEn: 'Switzerland', iso2: 'CH', iso3: 'CHE', currency: 'CHF' },
  { nameKo: '미국', nameEn: 'United States', iso2: 'US', iso3: 'USA', currency: 'USD' },
  { nameKo: '캐나다', nameEn: 'Canada', iso2: 'CA', iso3: 'CAN', currency: 'CAD' },
  { nameKo: '멕시코', nameEn: 'Mexico', iso2: 'MX', iso3: 'MEX', currency: 'MXN' },
  { nameKo: '브라질', nameEn: 'Brazil', iso2: 'BR', iso3: 'BRA', currency: 'BRL' },
  { nameKo: '페루', nameEn: 'Peru', iso2: 'PE', iso3: 'PER', currency: 'PEN' },
  { nameKo: '아르헨티나', nameEn: 'Argentina', iso2: 'AR', iso3: 'ARG', currency: 'ARS' },
  { nameKo: '쿠바', nameEn: 'Cuba', iso2: 'CU', iso3: 'CUB', currency: 'CUP' },
  { nameKo: '칠레', nameEn: 'Chile', iso2: 'CL', iso3: 'CHL', currency: 'CLP' },
  { nameKo: '호주', nameEn: 'Australia', iso2: 'AU', iso3: 'AUS', currency: 'AUD' },
  { nameKo: '뉴질랜드', nameEn: 'New Zealand', iso2: 'NZ', iso3: 'NZL', currency: 'NZD' },
  { nameKo: '피지', nameEn: 'Fiji', iso2: 'FJ', iso3: 'FJI', currency: 'FJD' },
  { nameKo: '괌', nameEn: 'Guam', iso2: 'GU', iso3: 'GUM', currency: 'USD' },
  { nameKo: '사이판', nameEn: 'Saipan', iso2: 'MP', iso3: 'MNP', currency: 'USD' },
  { nameKo: '하와이', nameEn: 'Hawaii', iso2: 'US', iso3: 'USA', currency: 'USD' },
  { nameKo: '튀르키예', nameEn: 'Turkey', iso2: 'TR', iso3: 'TUR', currency: 'TRY' },
  { nameKo: '두바이(UAE)', nameEn: 'Dubai', iso2: 'AE', iso3: 'ARE', currency: 'AED' },
  { nameKo: '모로코', nameEn: 'Morocco', iso2: 'MA', iso3: 'MAR', currency: 'MAD' },
  { nameKo: '이집트', nameEn: 'Egypt', iso2: 'EG', iso3: 'EGY', currency: 'EGP' },
  { nameKo: '케냐', nameEn: 'Kenya', iso2: 'KE', iso3: 'KEN', currency: 'KES' },
  { nameKo: '남아공', nameEn: 'South Africa', iso2: 'ZA', iso3: 'ZAF', currency: 'ZAR' },
  { nameKo: '요르단', nameEn: 'Jordan', iso2: 'JO', iso3: 'JOR', currency: 'JOD' },
];

// 도시 단위 한국어 → 영어 매핑 (국가 단위는 COUNTRIES에서 자동 파생)
const CITY_EN_MAP = {
  // 호주 도시 (시연 메인 대상)
  오스트레일리아: 'Australia',
  시드니: 'Sydney',
  멜버른: 'Melbourne',
  골드코스트: 'Gold Coast',
  케언즈: 'Cairns',
  브리즈번: 'Brisbane',
  퍼스: 'Perth',
  애들레이드: 'Adelaide',
  울루루: 'Uluru',
  에어즈록: 'Uluru',
  포트더글라스: 'Port Douglas',
  누사: 'Noosa',
  바이런베이: 'Byron Bay',
  헌터밸리: 'Hunter Valley',
  블루마운틴: 'Blue Mountains',
  필립아일랜드: 'Phillip Island',
  그레이트오션로드: 'Great Ocean Road',
  데인트리: 'Daintree',
  위틀선데이: 'Whitsundays',
  해밀턴아일랜드: 'Hamilton Island',
};

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function findCountryByDestination(destination) {
  const value = normalize(destination);
  if (!value) return null;
  return COUNTRIES.find(country => normalize(country.nameKo) === value) || null;
}

function toEnglishName(dest) {
  const trimmed = String(dest || '').trim();
  if (!trimmed) return trimmed;
  const country = COUNTRIES.find(c => c.nameKo === trimmed);
  if (country) return country.nameEn;
  return CITY_EN_MAP[trimmed] ?? trimmed;
}

module.exports = { COUNTRIES, findCountryByDestination, toEnglishName };
