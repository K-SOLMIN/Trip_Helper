const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
  'https://images.unsplash.com/photo-1615460549969-36fa19521a4f',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
]

export function pickHotelImage(id, size = 500) {
  const n = String(id).split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xffff, 0)
  return `${HOTEL_IMAGES[n % HOTEL_IMAGES.length]}?w=${size}&q=80`
}
