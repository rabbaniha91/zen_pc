import Slider from "../../models/slider.js";

export const setSlid = async (req, res) => {
  try {
    const { picture, title, content } = req.body;
    if (!picture) return res.sendStatus(401);
    const slid = new Slider({
      picture,
      title: title || "",
      content: content || "",
    });

    slid.save();
    res.status(201).json(slid);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
