import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from './../../config/mongodb.js';

class ProductRepository {
    constructor() {
        this.collection = "products";
    }
    async add(newProduct) {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch(err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async getAll() {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        } catch(err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async get(id) {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        } catch(err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default ProductRepository;