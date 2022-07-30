import { defineNuxtPlugin } from '#app'
import { Db, Collection } from 'mongodb'
import { toCamelCase } from './toCamelCase'

/**
 * MongoDB module imports all databases + collections whenever auto-generations is turned on.
 * Whenever building nuxt project a connection to given URI fetches the databases respecting
 * collections, whereby plugins are automatically being created based on fetched data.
 *
 * @important in order to fetch databases + collections and admin URI must be given in config
 */
export const pluginFactory = (factoryParams) => {
  const { databaseList, nitroDbRoute, nitroCollRoute, dbFunctions, collFunctions } = factoryParams

  const mongoDbRequest = async (dbName: string = null, func: string = null, payload = {}) => {
    const fetch = await useFetch(nitroDbRoute, { method: 'POST', ...{ dbName, func, payload } })
    return fetch
  }

  const mongoCollRequest = async (dbName: string = null, collName: string = null, func: string = null, payload = {}) => {
    const fetch = await useFetch(nitroCollRoute, {
      method: 'POST',
      ...{ dbName, collName, func, payload }
    })
    return fetch
  }

  function mapDatabase (dbList) {
    const obj = [...dbList]
    obj.map(db => [
      db.name,
      Object.fromEntries(
        dbFunctions.map(func => [func, payload => mongoDbRequest(db, func, payload)])
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
          collFunctions.map(func => [
            func,
            payload => mongoCollRequest(dbName, collName, func, payload)
          ])
        )
      })
    })
    return obj
  }

  function generatePluginFunctions (databaseList) {
    const databaseRes = { ...mapDatabase(databaseList) }
    Object.keys(databaseRes).forEach((key) => {
      const collectionList = databaseRes[key]
      mapCollection(collectionList).then((collRes) => {
        Object.assign(databaseRes[key], collRes)
      })
    })
    return databaseRes
  }
  const pluginFuncObject = generatePluginFunctions(databaseList)
  return pluginFuncObject
}
