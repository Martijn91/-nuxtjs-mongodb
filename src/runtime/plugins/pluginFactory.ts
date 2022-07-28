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

  const _mongoDbRequest = (dbName, func) => {
    return useFetch(dbReqRoute, { method: 'POST', ...{ dbName, func } })
  }

  const _mongoCollRequest = (dbName, collName, func) => {
    return useFetch(collReqRoute, {
      method: 'POST',
      ...{ dbName, collName, func }
    })
  }

  function dbFunctionFactory (dbList) {
    dbList.map(db => [
      db.name,
      Object.fromEntries(
        dbFunctions.map(func => [func, () => _mongoDbRequest(db, func)])
      )
    ])
    // for (const { collections, name } of dbList) {
    //   Object.fromEntries(
    //     collections.map(col => [
    //       col.name,
    //       Object.fromEntries(
    //         collectionFunctions.map(func => [
    //           col.name,
    //           () => _mongoCollRequest(name, col.name, func)
    //         ])
    //       )
    //     ])
    //   )
    //   // dbList.forEach((db) => {
    //   //   Object.fromEntries(db.collections.map(coll => [
    //   //     coll,
    //   //     Object.fromEntries(
    //   //       collectionFunctions.map(func => [
    //   //         func,
    //   //         () => _mongoCollRequest(db.name, coll, func)
    //   //       ])
    //   //     )
    //   //   ]))
    //   // })
    // }
    return dbList
  }

  function collFunctionFactory (coll, db) {
    Object.fromEntries(
      collectionFunctions.map(func => [
        func,
        () => _mongoCollRequest(collReqRoute, db, coll, func)
      ])
    )
  }

  const dbReqRoute = runtimeConfig.public.mongo.dbReqRoute
  const collReqRoute = runtimeConfig.public.mongo.collReqRoute
  const databaseList = runtimeConfig.mongo.databaseList
  const mongoFactory = {}
  /**
   * Map functions to fetched databases
   */
  const factory = dbFunctionFactory(databaseList)
  const databaseIndex = Object.fromEntries(factory.map(item => [item.name, item]))
  Object.keys(databaseIndex).forEach((item) => {
    const db = databaseIndex[item]
    const collections = db.collections
    Object.entries(collections).forEach((value) => {
      console.log('value', value)
    })
    console.log(collections)
  })

  // Object.keys(tree).forEach((db) => {
  //   console.log(tree[db].collections)
  //   // Object.fromEntries(tree[db].collections.map((collName) => {
  //   //   collFunctionFactory(collName, db)
  //   // }))
  //   console.log(tree[db])
  // })
})
