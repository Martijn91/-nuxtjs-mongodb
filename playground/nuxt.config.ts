import { defineNuxtConfig } from 'nuxt'
import MongoDBModule from '../src/module'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    MongoDBModule
  ],
  mongoDb: {
    uri: 'mongodb+srv://admin:admin@cluster0.yivu2fz.mongodb.net/?retryWrites=true&w=majority'
  }
})
