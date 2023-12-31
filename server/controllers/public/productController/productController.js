import Product from "../../../models/product.js";

class ProductController {
  constructor() {}

  static async getOffers(req, res) {
    try {
      const discountProduct = await Product.find(
        {
          offer: { $not: { $eq: 0 } },
        },
        "title price cover offer"
      ).exec();

      res.json(discountProduct);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProducts(req, res) {
    try {
      const { title, level } = req.params;
      const pageNum = parseInt(req.query.pageNum);
      const pageLimit = parseInt(req.query.pageLimit);
      let query = "";
      if (level == 1) {
        query = "generalCategory";
      } else if (level == 2) {
        query = "subCategory";
      } else if (level == 3) {
        query = "mainCategory";
      }
      const option = {
        page: pageNum,
        limit: pageLimit,
      };

      const productAggregate = Product.aggregate([
        {
          $match: { [`category.${query}`]: title },
        },
        {
          $project: {
            title: 1,
            price: 1,
            offer: 1,
            cover: 1,
            inventory: 1,
            producer: 1,
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      const products = await Product.aggregatePaginate(
        productAggregate,
        option
      );

      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProductsByBrands(req, res) {
    try {
      const brands = req.params.brands.split(",");
      const { title, level } = req.params;
      const pageNum = parseInt(req.query.pageNum);
      const pageLimit = parseInt(req.query.pageLimit);
      let query = "";
      if (level == 1) {
        query = "generalCategory";
      } else if (level == 2) {
        query = "subCategory";
      } else if (level == 3) {
        query = "mainCategory";
      }
      const option = {
        page: pageNum,
        limit: pageLimit,
      };

      const productAggregate = Product.aggregate([
        {
          $match: { [`category.${query}`]: title, producer: { $in: brands } },
        },
        {
          $project: {
            title: 1,
            price: 1,
            offer: 1,
            cover: 1,
            inventory: 1,
            producer: 1,
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      const products = await Product.aggregatePaginate(
        productAggregate,
        option
      );

      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.sendStatus(401);

      const product = await Product.findById(
        id,
        "title model producer cover pictures offer price inventory scores keyFeatures featuresTitle featuresValue"
      );
      res.json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
