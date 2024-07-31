import bcrypt from "bcrypt";
import User from "../models/User.js";
import ResetToken from "../models/ResetToken.js";
import { cookieToken } from "../utils/cookieToken.js";
import moment from "moment-timezone";
import { Op } from "sequelize";
import crypto from "crypto";
import { mailHelper } from "../utils/mailer.js";

function otpGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

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
    verified: false,
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User does not exists",
      success: false,
    });
  }
  const token = await crypto.randomBytes(32).toString("hex");
  const resetToken = await ResetToken.create({
    token,
    userId: user.id,
  });
  let option ={
    email:email,
    subject:"Forgot Password Token",
    message:`Copy paste the link in your browser and hit enter`
  }
  mailHelper(option)
  res.status(200).json({
    message: "Otp sent",
    resetToken,
    success: true,
  });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New Password and Confirm Password do not match",
    });
  }

  const resetTokenRecord = await ResetToken.findOne({
    where: {
      token,
      createdAt: {
        [Op.gte]: new Date(
          Date.now() - process.env.OTP_EXPIRY_TIME * 60 * 1000
        ),
      },
    },
  });

  if(!resetTokenRecord){
    return res.status(400).json({
      success:false,
      message:"Invalid or expired token"
    })
  }

  const user = await User.findByPk(resetTokenRecord.userId);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword,salt);
  user.password = hashedPassword;
  await user.save();

  await resetTokenRecord.destroy();

  res.status(201).json({
    success:true,
    message:"password reset successfully"
  })

};
