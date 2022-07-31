import { MongoClient } from 'mongodb'

async function _getDatabases (cs) {
  const client = await MongoClient.connect(cs)
  try {
    const adminDb = client.db().admin()
    const list = await adminDb.listDatabases()
    return list
  } catch (e) {
    throw new Error(e)
  } finally {
    await client.close()
  }
}

export default async (cs: string) => {
  try {
    const res = await _getDatabases(cs).then(async ({ databases }) => {
      const dbMap = await databases.map(async (db) => {
        const collections = await MongoClient.connect(cs).then(async (client) => {
          const collections = await client.db(db.name)?.listCollections()?.toArray()
          return collections
        })
        db.collectionData = collections
        return db
      })
      return dbMap
    }).then(async (val) => {
      const list = await Promise.all(val)
      return list
    })
    return res
  } catch (e) {
    throw new Error(e)
  }
}
