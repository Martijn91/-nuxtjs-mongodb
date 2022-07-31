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
    collName: body.collName,
    func: body.func,
    payload: body.payload
  }

  async function run (req) {
    const connection = await req.client.connect()
    try {
      const dbConnect = await connection.db(req.dbName)
      const collConnect = await dbConnect.collection(req.collName)
      console.log('🚀 ~ file: collectionReq.ts ~ line 28 ~ run ~ collConnect', collConnect)
      const res = await collConnect[req.func](req.payload)
      return res
    } catch (e) {
      throw new Error(e)
    } finally {
      await connection.close()
    }
  }

  const res = await run(requestData)
  return res
})
