import { defineNuxtConfig } from 'nuxt'
import MongoDBModule from '../src/module'

export default defineNuxtConfig({
  modules: [
    ['@nuxtjs/tailwindcss'],
    MongoDBModule
  ],
  mongoDb: {

    // username: 'martijnwennekes',
    // password: '1234',
    // host: 'webblox.quobw.mongodb.net',
    // database: 'myFirstDatabase',
    // options: {
    //   retryWrites: true,
    //   w: 'majority'
    // },
    // addPlugin: true
    uri: 'mongodb+srv://admin:admin@cluster0.yivu2fz.mongodb.net/?retryWrites=true&w=majority'
  }
})
