const { Router } = require('express');
const { searchStays, getStayDetail, createMockStayBooking } = require('../controllers/accomodationController');

const router = Router();

/**
 * @swagger
 * /api/stays/search:
 *   post:
 *     tags: [숙소]
 *     summary: 숙소 검색 (Hotelbeds)
 *     description: 국가명, 체크인/체크아웃, 성인 수를 기준으로 Hotelbeds Availability API에서 숙소를 검색합니다. 응답의 price는 검색 기간 전체 기준 최저 총액입니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaySearchRequest'
 *     responses:
 *       200:
 *         description: 숙소 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StaySummary'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/stays/search', searchStays);

/**
 * @swagger
 * /api/stays/bookings:
 *   post:
 *     tags: [숙소]
 *     summary: 숙소 가상 예약 생성
 *     description: Hotelbeds Availability API로 선택한 일정의 예약 가능 여부를 다시 확인한 뒤 테스트 예약번호를 발급하고 확인 이메일을 발송합니다. 실제 Hotelbeds 예약은 생성하지 않습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StayBookingRequest'
 *     responses:
 *       200:
 *         description: 가상 예약 완료 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StayBooking'
 *       409:
 *         description: 선택한 일정에 예약 가능한 객실 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.post('/stays/bookings', createMockStayBooking);

/**
 * @swagger
 * /api/stays/{hotelCode}:
 *   get:
 *     tags: [숙소]
 *     summary: 숙소 상세 조회 (Hotelbeds Content API)
 *     description: Hotelbeds 호텔 코드를 기준으로 숙소 설명, 주소, 이미지, 편의시설 등 정적 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: hotelCode
 *         required: true
 *         schema: { type: string }
 *         example: "169036"
 *     responses:
 *       200:
 *         description: 숙소 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StayDetail'
 *       500:
 *         $ref: '#/components/responses/Error'
 */
router.get('/stays/:hotelCode', getStayDetail);

module.exports = router;
