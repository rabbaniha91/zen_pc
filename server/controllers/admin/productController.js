import Product from "../../models/product.js";

class ProductController {
  constructor() {}

  static async addProduct(req, res) {
    try {
      console.log(req.body);
      const {
        generalCategory,
        subCategory,
        mainCategory,
        featuresTitle,
        featuresValue,
        pictures,
      } = req.body;
      const picturesUrl = pictures.map((img) => img.url);

      const product = new Product({
        title: req.body.title,
        producer: req.body.producer,
        price: req.body.price,
        category: { generalCategory, subCategory, mainCategory },
        offer: req.body.offer,
        model: req.body.model,
        keyFeatures: [...req.body.keyFeatures],
        cover: req.body.cover.url,
        pictures: [...picturesUrl],
        featuresTitle,
        featuresValue,
      });

      await product.save();

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
