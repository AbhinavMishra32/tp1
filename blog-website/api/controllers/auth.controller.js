import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // next(new Error("All fields are required"));
    next(errorHandler(400, "All fields are required"));
    // return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  }
  catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email == "" || password == "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "Invalid credentials"));
    }


  } catch (error) {
    next(error);
  }

}
