import express from "express";
import { addCategory } from "../controllers/admin/addCategoryController.js";
import imageUpload from "../middlewares/imageUpload.js";
import uploadController from "../controllers/uploadController.js";
import ProductController from "../controllers/admin/productController.js";
import { setSlid } from "../controllers/admin/setSlider.js";

const router = express.Router();

router.post("/entercategory", addCategory);
router.post("/productimage", imageUpload, uploadController.uploadImag);
router.post("/createproduct", ProductController.addProduct);
router.post("/slider", setSlid)

export default router;
