import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import loginToPostex, {
  deleteAddress,
  editAddress,
  enterNewAddress,
  getAllStates,
  getCitiesOfState,
  getShipping,
  postPrice,
} from "../controllers/shipping.js";
import addressValidator from "../validators/addressValidator.js";

const router = express.Router();

// public route

// protect route
router.use(verifyJWT);
router.get("/getshipping", getShipping);
router.get("/logintopostex", loginToPostex);
router.get("/getAllStates", getAllStates);
router.get("/getCityOfState/:id", getCitiesOfState);
router.post("/enternewaddress", addressValidator(), enterNewAddress);
router.post("/editaddress/:id", addressValidator(), editAddress);
router.delete("/deleteaddress/:id", deleteAddress);
router.post("/postprice", postPrice)

export default router;
