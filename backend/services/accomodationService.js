const { BASE_URL, getHeaders } = require('../config/hotelbeds');
const { genStayBookingRef, sendStayBookingEmail } = require('./emailService');
const COORDS = require('../data/hotelCoords');
const { pickImage } = require('../data/hotelImages');

function getDefaultDates() {
  const ci = new Date();
  ci.setDate(ci.getDate() + 30);
  const co = new Date(ci);
  co.setDate(co.getDate() + 1);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { checkIn: fmt(ci), checkOut: fmt(co) };
}

/* Content API에서 호텔 코드 목록의 이미지 URL을 가져옴 */
async function fetchHotelImages(codes) {
  if (!codes.length) return {};
  try {
    const qs = new URLSearchParams({
      codes:    codes.join(','),
      language: 'ENG',
      fields:   'images',
      from:     '1',
      to:       String(codes.length),
    });
    const res = await fetch(
      `${BASE_URL}/hotel-content-api/1.0/hotels?${qs}`,
      { method: 'GET', headers: getHeaders() }
    );
    if (!res.ok) return {};

    const json = await res.json();
    const hotels = json.hotels || [];
    const map = {};

    for (const h of hotels) {
      const imgs = h.images || [];
      /* GEN(외관) 우선, 없으면 첫 번째 이미지 */
      const best =
        imgs.find(i => i.imageTypeCode === 'GEN') ||
        imgs.find(i => i.imageTypeCode === 'HAB') ||
        imgs[0];
      if (best?.path) {
        map[String(h.code)] = `https://photos.hotelbeds.com/giata/bigger/${best.path}`;
      }
    }
    return map;
  } catch {
    return {};
  }
}

async function searchStays({ checkIn, checkOut, guests = 2, country }) {
  const coords = COORDS[country];
  if (!coords) throw new Error(`지원하지 않는 여행지: ${country}`);

  const defaults = getDefaultDates();
  const ci = checkIn || defaults.checkIn;
  const co = checkOut || defaults.checkOut;

  const body = JSON.stringify({
    stay: { checkIn: ci, checkOut: co },
    occupancies: [{ rooms: 1, adults: Number(guests), children: 0 }],
    geolocation: {
      latitude:  coords.latitude,
      longitude: coords.longitude,
      radius:    coords.radius,
      unit:      'km',
    },
    filter: { maxHotels: 20 },
  });

  const res = await fetch(`${BASE_URL}/hotel-api/1.0/hotels`, {
    method:  'POST',
    headers: getHeaders(),
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hotelbeds ${res.status}: ${text}`);
  }

  const json = await res.json();
  const hotels = (json.hotels?.hotels || []).slice(0, 20);

  if (!hotels.length) return [];

  /* 실제 호텔 이미지 가져오기 */
  const codes = hotels.map(h => String(h.code));
  const imageMap = await fetchHotelImages(codes);

  return hotels.map((hotel) => ({
    id:       String(hotel.code),
    name:     hotel.name,
    location: [hotel.zoneName, hotel.destinationName].filter(Boolean).join(' · '),
    rating:   hotel.categoryCode ? parseInt(hotel.categoryCode) : null,
    price:    parseFloat(hotel.minRate || 0),
    currency: hotel.currency || 'USD',
    image:    imageMap[String(hotel.code)] || pickImage(hotel.code),
    tag:      null,
  }));
}

function buildAvailabilityBody({ checkIn, checkOut, guests = 2, country, hotelCode }) {
  const defaults = getDefaultDates();
  const ci = checkIn || defaults.checkIn;
  const co = checkOut || defaults.checkOut;
  const body = {
    stay: { checkIn: ci, checkOut: co },
    occupancies: [{ rooms: 1, adults: Number(guests), children: 0 }],
    filter: { maxHotels: 20 },
  };

  if (hotelCode) {
    body.hotels = { hotel: [Number(hotelCode)] };
    body.filter.maxHotels = 1;
    return body;
  }

  const coords = COORDS[country];
  if (!coords) throw new Error(`지원하지 않는 여행지: ${country}`);
  body.geolocation = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    radius: coords.radius,
    unit: 'km',
  };
  return body;
}

async function fetchAvailableHotels({ checkIn, checkOut, guests = 2, country, hotelCode }) {
  const res = await fetch(`${BASE_URL}/hotel-api/1.0/hotels`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(buildAvailabilityBody({ checkIn, checkOut, guests, country, hotelCode })),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hotelbeds ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json.hotels?.hotels || [];
}

async function createMockStayBooking({ hotelCode, checkIn, checkOut, guests = 1, country, guestName, email, hotelName, location, image }) {
  if (!hotelCode || !checkIn || !checkOut || !email || !guestName) {
    const err = new Error('숙소 예약에 필요한 값이 누락되었습니다.');
    err.status = 400;
    throw err;
  }

  const hotels = await fetchAvailableHotels({ checkIn, checkOut, guests, country, hotelCode });
  const availableHotel = hotels.find(h => String(h.code) === String(hotelCode));

  if (!availableHotel) {
    const err = new Error('선택한 일정에는 예약 가능한 객실이 없습니다.');
    err.status = 409;
    throw err;
  }

  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
  const bookingRef = genStayBookingRef();
  const price = parseFloat(availableHotel.minRate || 0);
  const currency = availableHotel.currency || 'USD';
  const resolvedHotelName = availableHotel.name || hotelName || '';
  const resolvedLocation = [availableHotel.zoneName, availableHotel.destinationName].filter(Boolean).join(' · ') || location || '';

  const booking = {
    id: `stay_demo_${Math.random().toString(36).slice(2, 14)}`,
    booking_reference: bookingRef,
    status: 'confirmed',
    test_mode: true,
    guest_name: guestName,
    email,
    hotel: {
      id: String(availableHotel.code || hotelCode),
      name: resolvedHotelName,
      location: resolvedLocation,
      image,
    },
    check_in: checkIn,
    check_out: checkOut,
    nights,
    guests: Number(guests),
    total_amount: price,
    total_currency: currency,
    created_at: new Date().toISOString(),
  };

  try {
    booking.email_sent = await sendStayBookingEmail({
      to: email,
      guestName,
      bookingRef,
      hotelName: resolvedHotelName,
      location: resolvedLocation,
      checkIn,
      checkOut,
      nights,
      guests,
      totalPrice: price,
      currency,
      image,
    });
  } catch (err) {
    console.error('Stay email error:', err.message);
    booking.email_sent = false;
  }

  return booking;
}

async function getStayDetail(hotelCode) {
  const code = String(hotelCode || '').trim();
  if (!code) throw new Error('호텔 코드가 필요합니다.');

  const qs = new URLSearchParams({
    language: 'ENG',
    useSecondaryLanguage: 'false',
  });

  let res = await fetch(
    `${BASE_URL}/hotel-content-api/1.0/hotels/${encodeURIComponent(code)}/details?${qs}`,
    { method: 'GET', headers: getHeaders() }
  );

  if (!res.ok) {
    const listQs = new URLSearchParams({
      codes: code,
      language: 'ENG',
      from: '1',
      to: '1',
    });
    res = await fetch(
      `${BASE_URL}/hotel-content-api/1.0/hotels?${listQs}`,
      { method: 'GET', headers: getHeaders() }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Hotelbeds ${res.status}: ${text}`);
    }
  }

  const json = await res.json();
  const hotel = json.hotel || json.hotels?.[0] || json;
  const images = (hotel.images || [])
    .filter(img => img.path)
    .slice(0, 12)
    .map(img => ({
      type: img.imageTypeCode,
      url: `https://photos.hotelbeds.com/giata/bigger/${img.path}`,
    }));

  const facilities = (hotel.facilities || [])
    .map(f => f.description?.content || f.facilityName || f.facilityCode)
    .filter(Boolean)
    .slice(0, 18);

  return {
    id: String(hotel.code || code),
    name: hotel.name?.content || hotel.name || '',
    description: hotel.description?.content || '',
    address: hotel.address?.content || '',
    city: hotel.city?.content || hotel.city || '',
    destination: hotel.destinationName || hotel.destination?.name?.content || '',
    zone: hotel.zoneName || '',
    rating: hotel.categoryCode ? parseInt(hotel.categoryCode) : null,
    category: hotel.categoryName || hotel.categoryCode || '',
    coordinates: hotel.coordinates || null,
    phones: (hotel.phones || []).map(p => p.phoneNumber).filter(Boolean),
    emails: (hotel.emails || []).map(e => e.email).filter(Boolean),
    images: images.length ? images : [{ type: 'fallback', url: pickImage(code) }],
    facilities,
  };
}

module.exports = { searchStays, getStayDetail, createMockStayBooking };
