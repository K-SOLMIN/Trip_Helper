'use strict';

const COUNTRIES = [
  { nameKo: '일본', iso2: 'JP', iso3: 'JPN', currency: 'JPY' },
  { nameKo: '태국', iso2: 'TH', iso3: 'THA', currency: 'THB' },
  { nameKo: '베트남', iso2: 'VN', iso3: 'VNM', currency: 'VND' },
  { nameKo: '싱가포르', iso2: 'SG', iso3: 'SGP', currency: 'SGD' },
  { nameKo: '인도네시아', iso2: 'ID', iso3: 'IDN', currency: 'IDR' },
  { nameKo: '대만', iso2: 'TW', iso3: 'TWN', currency: 'TWD' },
  { nameKo: '홍콩', iso2: 'HK', iso3: 'HKG', currency: 'HKD' },
  { nameKo: '말레이시아', iso2: 'MY', iso3: 'MYS', currency: 'MYR' },
  { nameKo: '필리핀', iso2: 'PH', iso3: 'PHL', currency: 'PHP' },
  { nameKo: '프랑스', iso2: 'FR', iso3: 'FRA', currency: 'EUR' },
  { nameKo: '이탈리아', iso2: 'IT', iso3: 'ITA', currency: 'EUR' },
  { nameKo: '스페인', iso2: 'ES', iso3: 'ESP', currency: 'EUR' },
  { nameKo: '영국', iso2: 'GB', iso3: 'GBR', currency: 'GBP' },
  { nameKo: '독일', iso2: 'DE', iso3: 'DEU', currency: 'EUR' },
  { nameKo: '체코', iso2: 'CZ', iso3: 'CZE', currency: 'CZK' },
  { nameKo: '포르투갈', iso2: 'PT', iso3: 'PRT', currency: 'EUR' },
  { nameKo: '그리스', iso2: 'GR', iso3: 'GRC', currency: 'EUR' },
  { nameKo: '스위스', iso2: 'CH', iso3: 'CHE', currency: 'CHF' },
  { nameKo: '미국', iso2: 'US', iso3: 'USA', currency: 'USD' },
  { nameKo: '캐나다', iso2: 'CA', iso3: 'CAN', currency: 'CAD' },
  { nameKo: '멕시코', iso2: 'MX', iso3: 'MEX', currency: 'MXN' },
  { nameKo: '브라질', iso2: 'BR', iso3: 'BRA', currency: 'BRL' },
  { nameKo: '페루', iso2: 'PE', iso3: 'PER', currency: 'PEN' },
  { nameKo: '아르헨티나', iso2: 'AR', iso3: 'ARG', currency: 'ARS' },
  { nameKo: '쿠바', iso2: 'CU', iso3: 'CUB', currency: 'CUP' },
  { nameKo: '칠레', iso2: 'CL', iso3: 'CHL', currency: 'CLP' },
  { nameKo: '호주', iso2: 'AU', iso3: 'AUS', currency: 'AUD' },
  { nameKo: '뉴질랜드', iso2: 'NZ', iso3: 'NZL', currency: 'NZD' },
  { nameKo: '피지', iso2: 'FJ', iso3: 'FJI', currency: 'FJD' },
  { nameKo: '괌', iso2: 'GU', iso3: 'GUM', currency: 'USD' },
  { nameKo: '사이판', iso2: 'MP', iso3: 'MNP', currency: 'USD' },
  { nameKo: '하와이', iso2: 'US', iso3: 'USA', currency: 'USD' },
  { nameKo: '튀르키예', iso2: 'TR', iso3: 'TUR', currency: 'TRY' },
  { nameKo: '두바이(UAE)', iso2: 'AE', iso3: 'ARE', currency: 'AED' },
  { nameKo: '모로코', iso2: 'MA', iso3: 'MAR', currency: 'MAD' },
  { nameKo: '이집트', iso2: 'EG', iso3: 'EGY', currency: 'EGP' },
  { nameKo: '케냐', iso2: 'KE', iso3: 'KEN', currency: 'KES' },
  { nameKo: '남아공', iso2: 'ZA', iso3: 'ZAF', currency: 'ZAR' },
  { nameKo: '요르단', iso2: 'JO', iso3: 'JOR', currency: 'JOD' },
];

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function findCountryByDestination(destination) {
  const value = normalize(destination);
  if (!value) return null;
  return COUNTRIES.find(country => normalize(country.nameKo) === value) || null;
}

module.exports = { COUNTRIES, findCountryByDestination };
