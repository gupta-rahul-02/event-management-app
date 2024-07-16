import bcrypt from "bcrypt";
import User from "../models/User.js";
import { cookieToken } from "../utils/cookieToken.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.send("All fields are mandatory");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  cookieToken(newUser, res);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("All fields are mandatory");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
    // attributes: {
    //   exclude: ["password"],
    // },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Check your credentials",
      success: false,
    });
  }

  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;
  cookieToken(userWithoutPassword, res);
};
