import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
export const collections: { logs?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING_LOCAL!);
    try {

        await client.connect();
        const db: mongoDB.Db = client.db(process.env.DB_NAME!);
        const logsCollection: mongoDB.Collection = db.collection(process.env.LOGS_COLLECTION_NAME!);
        collections.logs = logsCollection;

        console.log(`\x1B[32m[MONGO]> Successfully connected to database: ${db.databaseName} and collection: ${logsCollection.collectionName}`);
    } catch (err) {
        console.log(`\x1B[31m[MONGO]> Error when connecting to ${process.env.DB_NAME!} : ${err}`);
    }

}