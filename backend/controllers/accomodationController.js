const accomodationService = require('../services/accomodationService');

async function searchStays(req, res, next) {
  try {
    const data = await accomodationService.searchStays(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getStayDetail(req, res, next) {
  try {
    const data = await accomodationService.getStayDetail(req.params.hotelCode);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function createMockStayBooking(req, res, next) {
  try {
    const data = await accomodationService.createMockStayBooking(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { searchStays, getStayDetail, createMockStayBooking };
