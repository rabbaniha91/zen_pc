import axios from "axios";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import formData from "form-data";

const Username = process.env.USER_NAME_POSTEX;
const Password = process.env.PASSWORD_POSTEX;

const loginToPostex = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie.postexToken) {
    try {
      const { data } = await axios.post(
        "https://postex.ir/api/login",
        {
          Username,
          Password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 15,
      };
      if (data) res.cookie("postexToken", data.Token, option);

      return res.sendStatus(204);
    } catch (error) {
      console.log("postex login error: ", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.sendStatus(204);
  }
};

export const getAllStates = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie.postexToken) return res.sendStatus(401);

    const { data } = await axios.get("https://postex.ir/api/state/getState", {
      headers: {
        Token: cookie.postexToken,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getCitiesOfState = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie.postexToken) return res.sendStatus(403);

    const stateId = req.params.id;
    if (!stateId) return res.sendStatus(400);

    const id = new FormData();
    id.append("stateId", stateId);
    let config = {
      method: "get",
      url: "https://postex.ir/api/town/getTownsByStateId",
      headers: {
        token: cookie.postexToken,
      },
      data: id,
    };

    const response = await axios(config);

    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getShipping = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(401);

    res.status(200).json(user.address);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const enterNewAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty)
      return res.status(400).json({ message: errors.array() });

    const userId = req.userId;
    const user = await User.findById(userId).exec();
    if (!user) return res.sendStatus(401);

    user.address.push(req.body);

    await user.save();

    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const editAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty)
      return req.status(400).json({ message: errors.array() });

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "user not found" });

    const addressId = req.params;
    if (!addressId) return res.sendStatus(400);

    const addressIndex = user.address.findIndex((address) => {
      return address._id.toString() === addressId.id;
    });

    if (addressIndex === -1) return res.sendStatus(404);

    user.address[addressIndex] = { ...req.body };

    await user.save();

    res.status(200).json(user.address);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.sendStatus(401);
    const addressId = req.params.id;
    if (!addressId) return res.sendStatus(400);
    const newAddressArray = user.address.filter((address) => {
      return address._id.toString() !== addressId;
    });

    user.address = newAddressArray;

    await user.save();

    res.status(200).json(user.address);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const postPrice = async (req, res) => {
  try {
    const { serviceId, city, ides } = req.body;
    console.log(serviceId);
    console.log(city);
    console.log(ides);
  } catch (error) {}
};

export default loginToPostex;
