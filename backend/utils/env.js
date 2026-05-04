const { createError } = require('./errors')

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw createError(`${name}이(가) 설정되어 있지 않습니다.`, 500)
  return value
}

module.exports = { requireEnv }
