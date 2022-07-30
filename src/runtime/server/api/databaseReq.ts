import { MongoClient } from 'mongodb'
import { defineEventHandler, useBody } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const mongoParams = runtimeConfig.mongo.params
  const body = await useBody(event)

  console.log('DATABASE REQ --- ', body)

  // const cs = runtimeConfig.mongo.cs
  // if (!cs) {
  //   // eslint-disable-next-line no-console
  //   console.warn('MongoDB module - no CS available')
  //   return
  // }

  // interface RequestData {
  //   client: MongoClient;
  //   database?: string;
  //   collection?: string;
  //   option: string;
  //   payload?: Record<string | number | symbol, any>
  // }

  // const requestData: RequestData = {
  //   client: new MongoClient(cs),
  //   database: body?.database || mongoParams?.database || null,
  //   collection: body?.collection || mongoParams?.collection || null,
  //   option: body.mongoOption,
  //   payload: body.payload
  // }

  // async function run (req) {
  //   try {
  //     await req.client.connect()
  //     if (req.database === null && req.collection === null) {
  //       const res = await req.client[req.option](req.payload)
  //       return res
  //     } else if (req.collection !== null && req.database === null) {
  //       const database = req.client.db(req.database)
  //       const res = await database[req.option](req.payload)
  //       return res
  //     } else if (req.database !== null && req.collection === null) {
  //       const database = req.client.db('Cluster0')
  //       const coll = database.collection(req.collection)
  //       const res = await coll[req.option](req.payload)
  //       return res
  //     } else {
  //       const database = req.client.db(req.database)
  //       const coll = await database.collection(req.collection)
  //       const res = await coll[req.option](req.payload)
  //       return res
  //     }
  //   } catch (e) {
  //     throw new Error(e)
  //   } finally {
  //     await req.client.close()
  //   }
  // }

  // const res = await run(requestData)
  // return res
})
