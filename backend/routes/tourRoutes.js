const { Router } = require('express');
const { searchTours, getTourDetail, getTourPhoto } = require('../controllers/tourController');

const router = Router();

/**
 * @swagger
 * /api/tours/search:
 *   get:
 *     tags: [투어티켓]
 *     summary: 해외 관광명소 검색
 *     description: Google Places API (New)의 Text Search로 관광명소를 조회하고 예약 권장/입장료 가능성 힌트를 반환합니다.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema: { type: string }
 *         example: Osaka attractions
 *       - in: query
 *         name: pageToken
 *         schema: { type: string }
 *         description: 다음 페이지 조회용 토큰입니다. 이전 응답의 nextPageToken 값을 전달합니다.
 *     responses:
 *       200:
 *         description: 관광명소 목록과 다음 페이지 토큰
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/tours/search', searchTours);

router.get('/tours/photo', getTourPhoto);

/**
 * @swagger
 * /api/tours/{placeId}:
 *   get:
 *     tags: [투어티켓]
 *     summary: 관광명소 상세 조회
 *     description: Google Places API (New)의 Place Details로 명소 상세 정보와 리뷰를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 관광명소 상세 정보
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/tours/:placeId', getTourDetail);

module.exports = router;
