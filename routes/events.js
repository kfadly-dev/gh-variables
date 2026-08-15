import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_ADDRESS}/?retryWrites=true&w=majority`;

let client;
let dbInstance;

export async function getDb() {
  if (!dbInstance) {
    client = new MongoClient(uri);
    await client.connect();
    dbInstance = client.db(process.env.MONGODB_DB_NAME);
  }
  return dbInstance;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    dbInstance = null;
  }
}