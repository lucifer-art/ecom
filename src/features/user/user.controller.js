import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 15);
      const newUser = new UserModel(name, email, hashedPassword, type);
      const user = await this.userRepository.signUp(newUser);
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }

  async signIn(req, res) {
    const user = await this.userRepository.findByEmail(req.body.email);
    if (!user) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(400).send("Incorrect Credentials");
      }
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send(token);
    }
  }
}