import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  console.log("Request Body:", req.body); // Add this line for debugging

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // next(new Error("All fields are required"));
    next(errorHandler(400, "All fields are required"));
    // return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await User.findOne({email});
  console.log("existing user:", existing);
  if (existing) {
    next(errorHandler(400, "User with this email or username already exists."));
  }

  try {
    // console.log("Data recieved: ", req.body);
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

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
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validUser._id, }, process.env.JWT_SECRET, { expiresIn: "30m" });

      // seperating the password from the validUser so that hashed password is not send to the client
      const { password: pass, ...rest } =  validUser._doc; // rest = validUser without the hashed password in the json
    
    res.status(200).cookie("access_token", token, {
      httpOnly: true,

    }).json(rest);}

  catch (error) {
    next(error);
  }

}
