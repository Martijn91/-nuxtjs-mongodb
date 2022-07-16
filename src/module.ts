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
    options: null,
    apiServerRoute: '/api/_mongodb/operate'
  },

  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeConfig = nuxt.options.runtimeConfig
    runtimeConfig.mongo = { cs: null, params: null, options: null }

    if (options.uri) {
      runtimeConfig.mongo.cs = process.env.MONGODB_URI || options.uri
    } else {
      const params = {
        username: process.env.MONGODB_USERNAME || options.username,
        password: process.env.MONGODB_PASSWORD || options.password,
        host: process.env.MONGODB_HOST || options.host,
        database: process.env.MONGODB_DATABASE || options.database,
        options: process.env.MONGODB_OPTIONS || options.options
      }

      const cs: string = getConnectionString(params)
      runtimeConfig.mongo.cs = cs
      runtimeConfig.mongo.params = params
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugins/plugin'))
    addServerHandler({
      route: options.apiServerRoute,
      handler: resolve(runtimeDir, 'server/api/_mongodb.post')
    })
  }
})
