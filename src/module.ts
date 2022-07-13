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
    uri: process.env.MONGODB_URI || null,
    username: process.env.MONGODB_USERNAME || null,
    password: process.env.MONGODB_PASSWORD || null,
    host: process.env.MONGODB_HOST || null,
    database: process.env.MONGODB_DATABASE || null,
    options: process.env.MONGODB_OPTIONS || null,
    clusterUrl: process.env.MONGODB_CLUSTER_URL || null
  },

  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeConfig = nuxt.options.runtimeConfig
    runtimeConfig.mongo = { cs: null, params: null, options: null }

    if (options.uri) {
      runtimeConfig.mongo.cs = options.uri
    } else {
      const params = {
        username: options.username,
        password: options.password,
        host: options.host,
        database: options.database,
        options: options.options
      }

      const cs: string = getConnectionString(params)
      runtimeConfig.mongo.cs = cs
      runtimeConfig.mongo.params = params
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugins/plugin'))
    addServerHandler({
      route: '/api/_mongodb/operate',
      handler: resolve(runtimeDir, 'server/api/_mongodb.post')
    })
  }
})
