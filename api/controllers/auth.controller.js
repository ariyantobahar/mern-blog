import User from "../models/user.module.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    password == "" ||
    email == ""
  ) {
    next(errorHandle(400, "All field are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();

    res.json("Signup successfull");
  } catch (error) {
    next(error);
  }
};
