import { fileURLToPath } from 'url'

import { defineNuxtModule, createResolver, addPlugin, addServerHandler } from '@nuxt/kit'
import { ModuleOptions } from '@nuxt/schema'
import { getConnectionString } from './utils/getConnectionString'

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
    apiServerRoute: '/api/_mongodb/operate'
  },

  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeConfig = nuxt.options.runtimeConfig

    const { Collection } = await import('mongodb')
    const operations = Object.getOwnPropertyNames(Collection.prototype)
    runtimeConfig.public.mongo = { operations }

    const params = {
      uri: process.env.MONGODB_URI || options.uri,
      username: process.env.MONGODB_USERNAME || options.username,
      password: process.env.MONGODB_PASSWORD || options.password,
      host: process.env.MONGODB_HOST || options.host,
      collection: process.env.MONGODB_COLLECTION || options.collection,
      database: process.env.MONGODB_DATABASE || options.database,
      options: process.env.MONGODB_OPTIONS || options.options
    }

    const cs = getConnectionString(params)
    if (!runtimeConfig.mongo) { runtimeConfig.mongo = {} }
    runtimeConfig.mongo.cs = cs
    runtimeConfig.mongo.params = params

    nuxt.options.build.transpile.push(
      'mongodb'
    )
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugins/plugin'))
    addServerHandler({
      route: options.apiServerRoute,
      handler: resolve(runtimeDir, 'server/api/session')
    })
  }
})
