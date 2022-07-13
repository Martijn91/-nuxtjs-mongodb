import { defineNuxtConfig } from 'nuxt'
import MongoDBModule from '../src/module'

export default defineNuxtConfig({
  modules: [
    MongoDBModule
  ],
  mongoDb: {

    username: 'martijnwennekes',
    password: '1234',
    hosts: [{
      host: 'webblox.quobw.mongodb.net'
    }],
    database: 'myFirstDatabase',
    options: {
      retryWrites: true,
      w: 'majority'
    },
    addPlugin: true
  }
})
