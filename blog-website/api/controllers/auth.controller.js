import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // next(new Error("All fields are required"));
    next(errorHandler(400, "All fields are required"));
    // return res.status(400).json({ message: "All fields are required" });
  }

  console.log("before hashing passw")
  const hashedPassword = await bcryptjs.hash(password, 10);
  console.log("after hashing pass")

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  }
  catch (error) {
    next(error);
  }
};
