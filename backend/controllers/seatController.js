const flightService = require('../services/flightService')
const { parseDuffelError } = require('../utils/errors')

async function getSeatMaps(req, res, next) {
  try {
    const data = await flightService.getSeatMaps(req.params.offerId)
    res.json(data)
  } catch (err) {
    const duffelErr = parseDuffelError(err)
    if (duffelErr) {
      console.error('Seat map error:', duffelErr.code, '-', duffelErr.message)
      if (duffelErr.code === 'not_supported' || duffelErr.code === 'not_found') {
        return res.json([])
      }
    }
    next(err)
  }
}

module.exports = { getSeatMaps }
