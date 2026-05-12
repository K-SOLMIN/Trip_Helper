'use strict';

// Open-Meteo 기반 여행 기간 날씨 조회 서비스 (API 키 불필요)

const FORECAST_MAX_DAYS = 16;

const { toEnglishName } = require('../data/countries');

// WMO 날씨 코드 → 한국어 레이블
const WMO_LABELS = {
  0: '맑음', 1: '대체로 맑음', 2: '구름 많음', 3: '흐림',
  45: '안개', 48: '안개',
  51: '이슬비', 53: '이슬비', 55: '이슬비',
  61: '비', 63: '비', 65: '강한 비',
  71: '눈', 73: '눈', 75: '강한 눈', 77: '싸락눈',
  80: '소나기', 81: '소나기', 82: '강한 소나기',
  85: '눈 소나기', 86: '눈 소나기',
  95: '뇌우', 96: '뇌우', 99: '뇌우',
};

function wmoLabel(code) {
  return WMO_LABELS[code] ?? '흐림';
}

function outdoorRecommendation(precipProb, code) {
  if (precipProb >= 60 || (code >= 61 && code <= 99)) return '실내 위주 권장';
  if (precipProb >= 35) return '우산 준비, 실내 비중 높임';
  return '야외 활동 적합';
}

function daysFromToday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (new Date(dateStr) - today) / 86400000;
}

async function geocodeDestination(destination) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding HTTP ${res.status}`);
  const data = await res.json();
  const hit = data.results?.[0];
  if (!hit) return null;
  return { lat: hit.latitude, lng: hit.longitude };
}

async function fetchForecast(lat, lng, startDate, endDate) {
  // 예보 범위는 최대 16일이므로 endDate를 클램핑
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxEnd = new Date(today);
  maxEnd.setDate(today.getDate() + FORECAST_MAX_DAYS - 1);
  const clampedEnd = new Date(endDate) > maxEnd ? maxEnd.toISOString().slice(0, 10) : endDate;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}`
    + `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max`
    + `&timezone=auto&start_date=${startDate}&end_date=${clampedEnd}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast HTTP ${res.status}`);
  return res.json();
}

async function fetchClimateArchive(lat, lng, startDate, endDate) {
  // 과거 동일 시기 데이터로 기후 패턴 추정 (전년도 같은 날짜 사용)
  const refYear = new Date().getFullYear() - 1;
  const archiveStart = `${refYear}${startDate.slice(4)}`;
  const archiveEnd = `${refYear}${endDate.slice(4)}`;

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}`
    + `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum`
    + `&timezone=auto&start_date=${archiveStart}&end_date=${archiveEnd}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Archive HTTP ${res.status}`);
  const data = await res.json();

  // precipitation_sum(mm) → 강수확률(%) 근사 변환
  if (data.daily?.precipitation_sum) {
    data.daily.precipitation_probability_max = data.daily.precipitation_sum.map(mm => {
      if (mm == null) return 30;
      if (mm > 10) return 85;
      if (mm > 5)  return 65;
      if (mm > 1)  return 45;
      return 15;
    });
  }
  return data;
}

function formatSummary(dailyData, startDate) {
  const { time, weathercode, temperature_2m_max, temperature_2m_min, precipitation_probability_max } = dailyData.daily || {};
  if (!time?.length) return '';

  const start = new Date(startDate);
  return time.map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    const code = weathercode?.[i] ?? 2;
    const tMax = temperature_2m_max?.[i]?.toFixed(0) ?? '?';
    const tMin = temperature_2m_min?.[i]?.toFixed(0) ?? '?';
    const precip = precipitation_probability_max?.[i] ?? 30;
    const rec = outdoorRecommendation(precip, code);
    return `  ${label}: ${wmoLabel(code)}, ${tMin}~${tMax}°C, 강수확률 ${precip}% → ${rec}`;
  }).join('\n');
}

async function getWeatherForTrip(destination, startDate, endDate) {
  if (!destination || !startDate || !endDate) return null;

  try {
    const coords = await geocodeDestination(toEnglishName(destination));
    if (!coords) {
      console.warn(`[Weather] 좌표 조회 실패: ${destination}`);
      return null;
    }

    const { lat, lng } = coords;
    const startDiff = daysFromToday(startDate);

    const data = startDiff <= FORECAST_MAX_DAYS
      ? await fetchForecast(lat, lng, startDate, endDate)
      : await fetchClimateArchive(lat, lng, startDate, endDate);

    const isArchive = startDiff > FORECAST_MAX_DAYS;
    const summary = formatSummary(data, startDate);
    if (!summary) return null;

    const header = isArchive
      ? `[여행 기간 날씨 — 전년도 동기 기후 패턴 기반]`
      : `[여행 기간 날씨 — Open-Meteo 실제 예보]`;
    return `${header}\n${summary}`;
  } catch (err) {
    console.warn(`[Weather] 조회 실패: ${err.message}`);
    return null;
  }
}

module.exports = { getWeatherForTrip };
