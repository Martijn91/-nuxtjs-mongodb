import { MongoClient } from 'mongodb'

export default async (cs: string) => {
  const client = await MongoClient.connect(cs)
  try {
    const adminDb = client.db().admin()
    const list = await adminDb.listDatabases()
    list.databases.forEach((database, index) => {
      const { name } = database
      const collections = client.db(name).listCollections()
      list.databases[index].collections = collections
    })
    return list.databases
  } catch (e) {
    throw new Error(e)
  } finally {
    client.close()
  }
}
