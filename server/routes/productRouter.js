import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

// public route
router.get("/getComments/:id", CommentController.getComments);

// protect route
router.use(verifyJWT);
router.post("/insertComment", CommentController.insertComment);
router.get("/likeComment", CommentController.likeComment)
router.get("/disLikeComment", CommentController.disLikeComment)

export default router;
