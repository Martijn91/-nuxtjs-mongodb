import { defineNuxtPlugin } from '#app'
import { Db, Collection } from 'mongodb'
import { toCamelCase } from '../../utils/toCamelCase'

/**
 * MongoDB module imports all databases + collections whenever auto-generations is turned on.
 * Whenever building nuxt project a connection to given URI fetches the databases respecting
 * collections, whereby plugins are automatically being created based on fetched data.
 *
 * @important in order to fetch databases + collections and admin URI must be given in config
 */
export default defineNuxtPlugin(() => {
  const _mongoDbRequest = (dbReqRoute, dbName, func) => {
    return useFetch(dbReqRoute, { method: 'POST', ...{ dbName, func } })
  }

  const _mongoCollRequest = (dbCollRoute, dbName, collName, func) => {
    return useFetch(dbCollRoute, {
      method: 'POST',
      ...{ dbName, collName, func }
    })
  }
  const runtimeConfig = useRuntimeConfig()
  const { dbFunctions, collectionFunctions } = runtimeConfig.mongo.functions
  const databaseList = runtimeConfig.mongo.databaseList
  const dbReqRoute = runtimeConfig.public.mongo.dbReqRoute
  const mongoFactory = {}

  const collectionFunctionFactory = (db, collections) => {}

  const dbNames = databaseList.map(db => db.name)
  const dbMap = Object.fromEntries(
    // map db functions
    databaseList.map(db => [
      db.name,
      Object.fromEntries(
        dbFunctions.map(func => [
          func,
          () => _mongoDbRequest(dbReqRoute, db, func)
        ])
      )
    ])
  )

  console.log(dbMap)
})
