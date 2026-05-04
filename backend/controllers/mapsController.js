const { requireEnv } = require('../utils/env')
const { createError } = require('../utils/errors')

const getEmbedUrl = (req, res, next) => {
  try {
    const key = requireEnv('GOOGLE_MAPS_API_KEY')

    const { lat, lng } = req.query
    const query = String(req.query.query || '').trim()
    const target = lat && lng ? `${lat},${lng}` : query

    if (!target) throw createError('지도 검색어 또는 좌표가 필요합니다.', 400)

    const encodedTarget = encodeURIComponent(target)
    res.json({
      embedUrl: `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodedTarget}&zoom=15`,
      externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedTarget}`,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getEmbedUrl }
