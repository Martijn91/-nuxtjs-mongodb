import { MongoClient } from 'mongodb'
import { defineEventHandler, useBody } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await useBody(event)

  const cs = runtimeConfig.mongo.cs
  if (!cs) {
    // eslint-disable-next-line no-console
    console.warn('MongoDB module - no CS available')
    return
  }

  const requestData = {
    client: new MongoClient(cs),
    dbName: body.dbName,
    func: body.func,
    payload: body.payload
  }

  async function run (req) {
    try {
      const connection = await req.client.connect()
      const dbConnect = await connection.db(req.dbName)
      const res = await dbConnect[req.func](req.payload)
      return res
    } catch (e) {
      throw new Error(e)
    } finally {
      await req.client.close()
    }
  }

  const res = await run(requestData)
  return res
})
