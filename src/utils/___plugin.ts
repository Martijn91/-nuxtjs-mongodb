// import { defineNuxtPlugin } from '#app'

// export default defineNuxtPlugin(() => {
//   interface MongoPluginPayload {
//     collection?: string;
//     database?: string;
//     [key: string | number | symbol]: any
//   }
//   interface RequestPayload {
//     body: {
//       mongoOption: string;
//       database?: string;
//       collection?: string;
//       payload?: MongoPluginPayload
//     }
//   }

//   const runtimeConfig = useRuntimeConfig()
//   const operations = runtimeConfig.public.mongo?.operations || []
//   const mongoRequest = async (args: RequestPayload) => await useFetch('/api/_mongodb/operate', { method: 'POST', ...args })
//   const mongo = {}

//   if (!operations && operations.length > 0) {
//     // eslint-disable-next-line no-console
//     return console.warn('MongoDB module - operations are missing')
//   }
//   operations.forEach((mongoOption) => {
//     if (mongoOption) {
//       mongo[mongoOption] = (payload = null, collection = null, database = null) => mongoRequest({
//         body: {
//           mongoOption,
//           payload,
//           ...collection && { collection },
//           ...database && { database }
//         }
//       })
//     }
//   })

//   // function MongoFunction (parameter) {
//   //   this.name = parameter
//   //   if (typeof parameter === 'function') {
//   //     return []
//   //   }
//   //   return { [parameter]: MongoFunction }
//   // }

//   // const parameterFunction = async (parameter) => {
//   //   return await parameter(MongoFunction)
//   // }
//   return {
//     provide: {
//       mongo: runtimeConfig.public.mongo.databaseList
//     }
//   }
// })
