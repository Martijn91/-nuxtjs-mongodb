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
export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { dbFunctions, collectionFunctions } = runtimeConfig.mongo.functions

  const _mongoDbRequest = (dbReqRoute, dbName, func) => {
    return useFetch(dbReqRoute, { method: 'POST', ...{ dbName, func } })
  }

  const _mongoCollRequest = (dbCollRoute, dbName, collName, func) => {
    return useFetch(dbCollRoute, {
      method: 'POST',
      ...{ dbName, collName, func }
    })
  }

  function dbFunctionFactory (dbList) {
    return dbList.map(db => [
      db.name,
      Object.fromEntries(
        dbFunctions.map(func => [
          func,
          () => _mongoDbRequest(dbReqRoute, db, func)
        ])
      )
    ])
  }

  function collFunctionFactory (collName, dbName) {
    Object.fromEntries(collectionFunctions.map(func => [
      func,
      () => _mongoCollRequest(dbCollRoute, dbName, collName, func)
    ]))
  }

  const databaseList = runtimeConfig.mongo.databaseList
  const dbReqRoute = runtimeConfig.public.mongo.dbReqRoute
  const dbCollRoute = runtimeConfig.public.mongo.dbCollRoute
  const mongoFactory = {}
  console.log(databaseList)
  /**
   * Map functions to fetched databases
   */
  // const tree = Object.fromEntries(
  //   dbFunctionFactory(databaseList)
  // )
  // Object.keys(tree).forEach((db) => {
  //   console.log(tree[db].collections())
  //   // Object.fromEntries(tree[db].collections.map((collName) => {
  //   //   collFunctionFactory(collName, db)
  //   // }))
  //   console.log(tree[db])
  // })
})
