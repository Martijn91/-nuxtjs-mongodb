import ConnectionString from 'mongodb-connection-string-url'
import { ConnectionStringParams } from '../@types'

/**
 * QS scheme:
 * mongodb://username:password@host1:port1,...,hostN:portN/database?authSource=admin&...
 */
export const getConnectionString = (params: ConnectionStringParams): string => {
  const { username, password, host, database, options } = params

  // encode user & pass
  const usernameEncoded = username ? encodeURIComponent(username) : null
  const passwordEncoded = password ? encodeURIComponent(password) : null

  // if host = Array: host turns in comma-seperated string
  const hostStr = typeof host !== 'string' && host?.length > 0 ? host.join(',') : host

  // optional user params
  const userStr = usernameEncoded && passwordEncoded ? `${usernameEncoded}:${passwordEncoded}@` : ''

  // set uri
  const uri = `mongodb+srv://${userStr}${hostStr}/${database}`

  const cs = new ConnectionString(uri)

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      cs.searchParams.set(key, value)
    })
  }

  return cs.href
}
