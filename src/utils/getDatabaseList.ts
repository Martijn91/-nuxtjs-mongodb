import { MongoClient } from 'mongodb'

export default async (cs: string) => {
  try {
    const client = await MongoClient.connect(cs)
    const adminDb = client.db().admin()
    const list = await adminDb.listDatabases()
    list.databases.forEach((database, index) => {
      const { name } = database
      const collections = client.db(name).listCollections()
      list.databases[index].collections = collections
    })
    client.close()
    return list.databases
  } catch (e) {
    throw new Error(e)
  }
}
