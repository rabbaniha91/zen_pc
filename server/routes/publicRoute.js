import express from "express"
import { getCategory } from "../controllers/public/getCategory.js"
import { getSlides } from "../controllers/public/slideController.js"
import ProductController from "../controllers/public/productController/productController.js"
import CartController from "../controllers/cartController.js"

const router = express.Router()

router.get("/getCategory", getCategory)
router.get("/slider", getSlides)
router.get("/discountProduct", ProductController.getOffers);
router.get("/products/:title/:level", ProductController.getProducts);
router.get("/products/:title/:level/:brands", ProductController.getProductsByBrands);
router.get("/product/:id", ProductController.getProduct)
router.post("/cartItems" , CartController.saveCartItems)


export default router