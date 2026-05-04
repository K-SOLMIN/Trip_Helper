const { Router } = require('express');

const router = Router();

/**
 * @swagger
 * /api/maps/embed-url:
 *   get:
 *     tags: [지도]
 *     summary: Google Maps Embed URL 생성
 *     description: 숙소명, 주소 또는 좌표를 기준으로 Google Maps Embed API URL과 새 탭용 지도 URL을 반환합니다.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema: { type: string }
 *         example: Rixos Pera Istanbul
 *       - in: query
 *         name: lat
 *         schema: { type: number }
 *         example: 41.0311
 *       - in: query
 *         name: lng
 *         schema: { type: number }
 *         example: 28.9732
 *     responses:
 *       200:
 *         description: 지도 URL
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/maps/embed-url', (req, res, next) => {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
      const err = new Error('GOOGLE_MAPS_API_KEY가 설정되어 있지 않습니다.');
      err.status = 500;
      throw err;
    }

    const lat = req.query.lat;
    const lng = req.query.lng;
    const query = String(req.query.query || '').trim();
    const target = lat && lng ? `${lat},${lng}` : query;

    if (!target) {
      const err = new Error('지도 검색어 또는 좌표가 필요합니다.');
      err.status = 400;
      throw err;
    }

    const encodedTarget = encodeURIComponent(target);
    res.json({
      embedUrl: `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodedTarget}&zoom=15`,
      externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedTarget}`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
