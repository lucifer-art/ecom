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

    async filter(minPrice, maxPrice, category) {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const filterExp = {};
            if(minPrice){
                filterExp.price = {$gte: parseFloat(minPrice)};
            }
            if(maxPrice){
                
                filterExp.price = {...filterExp.price, $lte: parseFloat(maxPrice)};
            }
            if(category) {
                filterExp.category = category;
            }
            return await collection.find(filterExp).toArray();
        } catch(err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }
    rate(userID, productID, rating) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $push: {
                    ratings: {
                        userID: new ObjectId(userID),
                        rating
                    }
                }
            })
        } catch(err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default ProductRepository;