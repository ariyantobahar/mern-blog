import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { password, email } = req.body;

  if (!email || !password || password == "" || email == "") {
    next(errorHandle(400, "All field are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandle(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandle(400, "Invalid Password"));
    }
    const token = jwt.sign(
      { userid: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      user = await newUser.save();
    }
    const token = jwt.sign(
      { userid: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
