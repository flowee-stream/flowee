import { MongoClient } from "mongodb"

export async function connectMongo() {
    const client = await MongoClient.connect(process.env.MONGO_URL)
    return client.db(process.env.MONGO_DB)
}