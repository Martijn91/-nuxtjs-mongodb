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
  const { databaseList, nitroDbRoute, nitroCollRoute, dbFunctions, collFunctions } = runtimeConfig.public.mongo.factoryParams

  const mongoDbRequest = (dbName: string = null, func: string = null) => {
    const query = async (payload) => {
      const fetch = await useFetch(nitroDbRoute, { method: 'POST', ...{ dbName, func, payload } })
      return fetch
    }
    return query
  }

  const mongoCollRequest = (dbName: string = null, collName: string = null, func: string = null) => {
    const query = async (payload) => {
      const fetch = await useFetch(nitroCollRoute, {
        method: 'POST',
        ...{ dbName, collName, func, payload }
      })
      return fetch
    }
    return query
  }

  const mapDatabase = (dbList) => {
    const obj = dbList
    const dbIndex = { ...Object.fromEntries(obj.map(item => [item.name, item])) }
    Object.keys(dbIndex).forEach((dbName) => {
      const functionIndex = Object.fromEntries(dbFunctions.map(func => [func, mongoDbRequest(dbName, func)]))
      dbIndex[dbName] = { ...dbIndex[dbName], ...functionIndex }
    })
    return dbIndex
  }

  const mapCollection = (dbList) => {
    const obj = dbList
    const dbName = obj?.name
    const collectionNames = obj?.collectionData?.map(item => item.name)

    collectionNames.forEach((collName) => {
      obj[collName] = Object.fromEntries(
        collFunctions.map(func => [
          func,
          mongoCollRequest(dbName, collName, func)
        ])
      )
    })
    return obj
  }

  const generatePluginFunctions = (databaseList) => {
    const databaseRes = mapDatabase(databaseList)
    Object.keys(databaseRes).forEach((key) => {
      const collectionList = databaseRes[key]
      const collRes = mapCollection(collectionList)
      databaseRes[key] = collRes
    })
    return databaseRes
  }
  const pluginFuncObject = { ...generatePluginFunctions(databaseList) }
  return {
    provide: {
      mongo: pluginFuncObject
    }
  }
})
