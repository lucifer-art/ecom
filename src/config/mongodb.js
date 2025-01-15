import { MongoClient } from "mongodb";

let client;
export const connecToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL).then(clientInstance => {
        client = clientInstance;
        console.log("MongoDB is connected")
    }).catch(err => console.error(err));
}

export const getDB = () => {
    return client.db();
}