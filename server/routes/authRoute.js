import express from "express"
import userController from "../controllers/userController.js";
import loginValidator from "../validators/loginValidator.js";
import registerValidator from "../validators/registerValidator.js";
import verifyJWT from "../middlewares/verifyJWT.js"

const router = express.Router()

// public route

router.post("/register", registerValidator(), userController.register);
router.post("/confirm", userController.authenticate);
router.post("/login", loginValidator(), userController.loginWithEmail)
router.get("/refreshToken", userController.refreshToken);

// protect route 
router.use(verifyJWT)
router.get("/logout", userController.logout)

export default router