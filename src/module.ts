import { fileURLToPath } from 'url'

import { defineNuxtModule, createResolver, addPlugin, addServerHandler } from '@nuxt/kit'
import { ModuleOptions } from '@nuxt/schema'
import { getConnectionString } from './utils/getConnectionString'

import _getDatabaseList from './utils/getDatabaseList'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/mongodb',
    configKey: 'mongoDb',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    addPlugin: true,
    uri: null,
    username: null,
    password: null,
    host: null,
    database: null,
    collection: null,
    options: {},
    pluginFactory: true,
    serverRoute: '/api/_mongodb/operate'
  },

  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeConfig = nuxt.options.runtimeConfig

    /**
     * Fetch base mongodb func
     */
    const { Collection, Db } = await import('mongodb')
    const collectionFunctions = Object.getOwnPropertyNames(Collection.prototype)
    const dbFunctions = Object.getOwnPropertyNames(Db.prototype)

    /**
     * Set base mongodb func
     */
    runtimeConfig.mongo = {
      classes: { Collection, Db },
      functions: { collectionFunctions, dbFunctions }
    }

    /**
     * Module params
     */
    const params = {
      uri: process.env.MONGODB_URI || options.uri,
      username: process.env.MONGODB_USERNAME || options.username,
      password: process.env.MONGODB_PASSWORD || options.password,
      host: process.env.MONGODB_HOST || options.host,
      collection: process.env.MONGODB_COLLECTION || options.collection,
      database: process.env.MONGODB_DATABASE || options.database,
      options: process.env.MONGODB_OPTIONS || options.options,
      serverRoute: process.env.MONGODB_SERVER_ROUTE || options.serverRoute
    }

    /**
     * Connection string creation
     */
    const cs = getConnectionString(params)
    if (!runtimeConfig.mongo) { runtimeConfig.mongo = {} }
    runtimeConfig.mongo.cs = cs
    runtimeConfig.mongo.params = params

    /**
     * Set database + collection data
     */
    // plugin factory (auto import) (@requires admin uri)
    if (options.pluginFactory) {
      const databaseList = await _getDatabaseList(cs)
      runtimeConfig.mongo.databaseList = databaseList

    // manual plugin config (requires database + collection options)
    } else {
      console.log('manual')
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugins/pluginFactory'))
    // addPlugin(resolve(runtimeDir, 'plugins/plugin'))

    /**
     * Server middleware
     */
    runtimeConfig.public.mongo = { serverRoute: options.serverRoute }
    addServerHandler({
      route: options.serverRoute,
      handler: resolve(runtimeDir, 'server/api/session')
    })
  }
})
