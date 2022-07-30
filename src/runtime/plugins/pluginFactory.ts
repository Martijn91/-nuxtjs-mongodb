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

  function mapDatabase (dbList) {
    const obj = [...dbList]
    obj.map(db => [
      db.name,
      Object.fromEntries(
        dbFunctions.map(func => [func, () => _mongoDbRequest(db, func)])
      )
    ])
    const res = Object.fromEntries(obj.map(item => [item.name, item]))
    return res
  }

  function mapCollection (dbList) {
    const obj = { ...dbList }
    const dbName = obj?.name
    const collectionNames = obj?.collections?.map(item => item.name)

    collectionNames.forEach((collName) => {
      Object.assign(obj, {
        [collName]: Object.fromEntries(
          collectionFunctions.map(func => [
            func,
            () => _mongoCollRequest(dbName, collName, func)
          ])
        )
      })
    })
    return obj
  }

  function generatePluginFunctions (databaseList) {
    const databaseRes = mapDatabase(databaseList)
    Object.keys(databaseRes).forEach((key) => {
      const collectionList = databaseRes[key]
      const collRes = mapCollection(collectionList)
      databaseRes[key] = { ...databaseRes[key], ...collRes }
    })
    return databaseRes
  }

  const dbReqRoute = runtimeConfig.public.mongo.dbReqRoute
  const collReqRoute = runtimeConfig.public.mongo.collReqRoute
  const databaseList = runtimeConfig.mongo.databaseList

  const pluginFuncObject = generatePluginFunctions(databaseList)

  // Object.keys(databaseIndex).forEach((item) => {
  //   const db = databaseIndex[item]
  //   const collections = db.collections
  //   Object.entries(collections).forEach((value) => {
  //     console.log('value', value)
  //   })
  //   console.log(collections)
  // })

  // Object.keys(tree).forEach((db) => {
  //   console.log(tree[db].collections)
  //   // Object.fromEntries(tree[db].collections.map((collName) => {
  //   //   collFunctionFactory(collName, db)
  //   // }))
  //   console.log(tree[db])
  // })
})
