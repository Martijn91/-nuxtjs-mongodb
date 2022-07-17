import ConnectionString from 'mongodb-connection-string-url'

/**
 * QS scheme:
 * mongodb://username:password@host1:port1,...,hostN:portN/database?authSource=admin&...
 */
export const getConnectionString = (params) => {
  const { uri = null, username = null, password = null, host = null, options = {} } = params

  // encode user & pass
  const usernameEncoded = username ? encodeURIComponent(username) : null
  const passwordEncoded = password ? encodeURIComponent(password) : null

  // if host = Array: host turns in comma-seperated string
  const hostStr = host ? (typeof host !== 'string' && host?.length > 0 ? host.join(',') : host) : null

  // optional user params
  const userStr = usernameEncoded && passwordEncoded ? `${usernameEncoded}:${passwordEncoded}@` : ''

  // set uri
  const uriFormat = uri || `mongodb+srv://${userStr}${hostStr}`

  const cs = new ConnectionString(uriFormat)

  Object.entries(options)?.forEach(([key, value]) => {
    cs.searchParams.set(key, value as any)
  })

  return cs.href
}
