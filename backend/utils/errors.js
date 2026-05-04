function createError(message, status = 500) {
  const err = new Error(message)
  err.status = status
  return err
}

function parseDuffelError(err) {
  const duffelErrors = err.errors
  if (!duffelErrors?.length) return null
  return duffelErrors[0]
}

module.exports = { createError, parseDuffelError }
