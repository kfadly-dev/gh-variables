import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    return client.db(dbName);
  } catch (error) {
    console.error('Connection failed:', error);
    await client.close();
    throw error; // Re-throw so CI workflows fail fast instead of hanging
  }
}