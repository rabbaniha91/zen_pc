import Slider from "../../models/slider.js";

export const getSlides = async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
