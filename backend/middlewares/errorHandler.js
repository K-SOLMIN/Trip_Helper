const { parseDuffelError } = require('../utils/errors')

function errorHandler(err, req, res, next) {
  const duffelErr = parseDuffelError(err)
  if (duffelErr) {
    console.error(`[${req.method} ${req.path}] Duffel error: ${duffelErr.code} - ${duffelErr.message}`)
    return res.status(500).json({ error: `${duffelErr.code}: ${duffelErr.message}` })
  }
  const message = err.message || '서버 오류가 발생했습니다.'
  console.error(`[${req.method} ${req.path}] Error: ${message}`, err.stack || '')
  res.status(err.status || 500).json({ error: message })
}

module.exports = errorHandler
