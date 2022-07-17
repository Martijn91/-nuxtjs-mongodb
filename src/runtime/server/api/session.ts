import { MongoClient } from 'mongodb'
import { defineEventHandler, useBody } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const mongoParams = runtimeConfig.mongo.params
  const body = await useBody(event)

  const cs = runtimeConfig.mongo.cs
  if (!cs) {
    // eslint-disable-next-line no-console
    console.warn('MongoDB module - no CS available')
    return
  }

  interface RequestData {
    client: MongoClient;
    database?: string;
    collection?: string;
    option: string;
    payload?: {
      mongoOption: string;
      database?: string;
      collection?: string;
      payload?: Record<string | number | symbol, any>
    }
  }

  const requestData: RequestData = {
    client: new MongoClient(cs),
    database: body?.database || mongoParams?.database || null,
    collection: body?.collection || mongoParams?.collection || null,
    option: body.mongoOption,
    payload: body.payload
  }

  async function run (req) {
    const option = req.mongoOption
    const payload = req.payload

    const mongoRequest = async (client: MongoClient) => {
      if (!req.database && !req.collection) {
        const res = await client[option](payload)
        return res
      } else if (!req.collection === null && req.database) {
        const database = await client.db(req.database)
        const res = await database[option](payload)
        return res
      } else if (!req.database === null && req.collection) {
        const collection = await client.db('Cluster0').collection(req.collection)
        const res = await collection[option](payload)
        return res
      } else {
        const database = await client.db(req.database)
        const collection = await database.collection(req.collection)
        const res = await collection[option](payload)
        return res
      }
    }
    try {
      const client = await req.client.connect()
      const res = await mongoRequest(client)
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
