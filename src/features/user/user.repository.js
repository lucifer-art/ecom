import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
  async signUp(newUser) {
    try {
      const db = getDB();
      const collections = db.collection("users");
      await collections.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findByEmail(email) {
    try {
        const db = getDB();
        const collection = db.collection("users");
        return await collection.findOne({email});
    } catch(err) {
        console.log("repository == ",err);
        throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default UserRepository;
