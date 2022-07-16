import { MongoClient } from 'mongodb'
import { defineEventHandler, useBody } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const mongoParams = runtimeConfig.mongo.params
  const { mongoOption, payload, database: bodyDatabase, collection: bodyCollection } = await useBody(event)
  const cs = runtimeConfig.mongo.cs
  if (!cs) {
    // eslint-disable-next-line no-console
    console.log('MongoDB - no CS available')
    return
  }
  const mongoClient = new MongoClient(cs)
  const reqDatabase = bodyDatabase || mongoParams.database
  const reqCollection = bodyCollection || mongoParams.collection
  async function run () {
    try {
      await mongoClient.connect()
      const db = mongoClient.db(reqDatabase)
      const col = db.collection(reqCollection)

      const res = await col[mongoOption](payload)
      return res
    // eslint-disable-next-line no-console
    } catch (e) { console.log(e) } finally {
      await mongoClient.close()
    }
  }
  const res = await run()
  return res
})
