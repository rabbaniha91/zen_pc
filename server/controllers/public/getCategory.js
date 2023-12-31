import Category from "../../models/category.js";

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find().exec();
    if (!category)
      return res.status(404).json({ message: "دسته بندی ثبت نشده است." });
    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
