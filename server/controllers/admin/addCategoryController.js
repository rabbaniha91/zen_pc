import Category from "../../models/category.js";

export const addCategory = async (req, res) => {
  try {
    const category = req.body;
    if (!category)
      return res.status(401).json({ message: "لطفا موارد را ارسال کنید." });
    const repeat = await Category.findOne({ title: category.title });
    if (repeat)
      return res.status(401).json({ message: "عنوان دسته بندی تکراری است." });
    const newCategory = new Category({
      title: category.head,
      subTitles: [...category.items],
    });
    console.log(newCategory);
    await newCategory.save();

    res.status(201).json({ message: "دسته بندی ایجاد شد." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
