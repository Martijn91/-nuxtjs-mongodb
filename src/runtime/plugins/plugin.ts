import { defineNuxtPlugin } from '#app'
import * as mongoTypes from 'mongodb'

export default defineNuxtPlugin(() => {
  const mongoRequest = async args => await useFetch('/api/_mongodb/operate', { method: 'POST', ...args })

  const mongo = {}
  const mongoCollectionFunctions = Object.getOwnPropertyNames(mongoTypes.Collection.prototype)

  mongoCollectionFunctions.forEach((mongoOption) => {
    mongo[mongoOption] = (collection, payload, database) => mongoRequest({
      body: {
        mongoOption,
        collection,
        payload,
        database
      }
    })
  })

  return {
    provide: {
      mongo
    }
  }
})
