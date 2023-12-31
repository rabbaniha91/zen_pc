import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import { sendVerficationEmail } from "../utilities/mailer.js";
import {
  createAccessToken,
  createRefreshToken,
  setRefreshTokenArray,
} from "../utilities/jwtHelper.js";

const { MAIL_REFRESH_TOKEN, SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } =
  process.env;

class userController {
  constructor() {}

  // register

  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });
      if (req.body.email) {
        const repeatUser = await User.findOne({ email: req.body.email });
        if (repeatUser)
          return res
            .status(400)
            .json({ message: "کاربر با این آدرس ایمیل موجود است." });
      }
      if (req.body.mobileNumber) {
        const repeatUser = await User.findOne({
          mobileNumber: req.body.mobileNumber,
        });
        if (repeatUser)
          return res
            .status(400)
            .json({ message: "کاربر با این شماه همراه موجود است." });
      }

      if (!req.body.term.includes("on"))
        return res.status(400).json({ message: "قوانین سایت تایید نشده است." });
      const emailAuthCode = randomstring.generate(8);
      const user = new User({
        ...req.body,
        emailAuthCode,
      });

      const name = req.body.firstName + " " + req.body.lastName;
      await sendVerficationEmail(req.body.email, name, emailAuthCode);
      await user.save();
      return res.status(201).json({ message: "کاربر جدید ایجاد گردید." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // authenticate

  static async authenticate(req, res) {
    try {
      const { email, code } = req.body;
      if (!email || !code)
        return res
          .status(400)
          .json({ message: "لطفا ایمیل و کد را ارسال کنید." });
      const user = await User.findOne({ email }).exec();
      if (!user) return res.status(404).json({ message: "کاربری پیدا نشد." });
      if (user.verified)
        return res.status(401).json({ message: "کاربر احراز هویت شده است." });
      if (user.emailAuthCode !== code)
        return res.status(401).json({ message: "کد اشتباه هست." });
      const accessToken = createAccessToken(
        user._id,
        SECRET_ACCESS_TOKEN,
        "5m"
      );
      const refreshToken = createRefreshToken(
        user._id,
        SECRET_REFRESH_TOKEN,
        "15d"
      );
      user.refreshToken = [refreshToken];
      user.verified = true;
      await user.save();
      const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 15,
      };

      res.cookie("jwtaaass", refreshToken, option);

      const userInfo = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        verified: user.verified,
        picture: user.picture,
      };

      res.json({ userInfo, accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // login account with email
  static async loginWithEmail(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });
      const cookies = req.cookies;
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(401)
          .json({ message: "ایمیل یا رمز عبور ارسال نشده است." });
      const user = await User.findOne({ email }).exec();
      if (!user)
        return res
          .status(404)
          .json({ message: "کاربر با این آدرس ایمیل پیدا نشد." });

      const macthPass = await bcrypt.compare(password, user.password);
      if (!macthPass)
        return res.status(403).json({ message: "رمزعبور اشتباه است." });
      const accessToken = createAccessToken(
        user._id,
        SECRET_ACCESS_TOKEN,
        "5m"
      );
      const refreshToken = createRefreshToken(
        user._id,
        SECRET_REFRESH_TOKEN,
        "15d"
      );
      let refreshTokenArray = setRefreshTokenArray(user, cookies);
      if (cookies?.jwtaaass) {
        const refreshToken = cookies?.jwtaaass;
        const tokenUser = await User.findOne({ refreshToken }).exec();
        if (!tokenUser) {
          refreshTokenArray = [];
        }
        res.clearCookie("jwtaaass", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      user.refreshToken = [...refreshTokenArray, refreshToken];
      await user.save();
      const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 15,
      };
      res.cookie("jwtaaass", refreshToken, option);

      const userInfo = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        verified: user.verified,
        picture: user.picture,
      };

      res.json({ userInfo, accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // refesh token
  static async refreshToken(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwtaaass)
      return res.status(401).json({ message: "Not verify!" });

    const refreshToken = cookies.jwtaaass;
    res.clearCookie("jwtaaass", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      jwt.verify(refreshToken, SECRET_REFRESH_TOKEN, async (err, decoded) => {
        if (err) return;

        const hackedUser = await User.findOne({ id: decoded.id }).exec();
        if (hackedUser) {
          hackedUser.refreshToken = [];
          hackedUser.save();
        }
      });

      return res.status(403);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );

    jwt.verify(refreshToken, SECRET_REFRESH_TOKEN, async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }
      if (err || foundUser.id !== decoded.id) return res.status(403);

      const accessToken = createAccessToken(
        foundUser._id,
        SECRET_ACCESS_TOKEN,
        "5m"
      );
      const newRefreshToken = createRefreshToken(
        foundUser._id,
        SECRET_REFRESH_TOKEN,
        "15d"
      );
      await User.findOneAndUpdate(
        { _id: foundUser._id },
        {
          refreshToken: [...newRefreshTokenArray, newRefreshToken],
          version: foundUser.version + 1,
        },
        { new: true }
      );

      const userInfo = {
        name: `${foundUser.firstName} ${foundUser.lastName}`,
        email: foundUser.email,
        verified: foundUser.verified,
        picture: foundUser.picture,
      };

      res.cookie("jwtaaass", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 15,
      });

      return res.status(200).json({ accessToken, userInfo });
    });
  }

  static async logout(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwtaaass) return res.sendStatus(204);

    const refreshToken = cookies.jwtaaass;
    const user = await User.findOne({ refreshToken });
    console.log("USer: ", user);
    if (!user) {
      res.clearCookie("jwtaaass", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204);
    }
    let newRefreshTokenArray = user.refreshToken;
    newRefreshTokenArray = newRefreshTokenArray.filter(
      (rt) => rt !== refreshToken
    );

    user.refreshToken = [...newRefreshTokenArray];
    await user.save();
    res.clearCookie("jwtaaass", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.sendStatus(204);
  }

  
}

export default userController;
