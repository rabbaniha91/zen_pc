import fs from "fs";

const imageUpload = (req, res, next) => {
  try {
    let files = req.files;
    if (!files || files.length === 0)
      return res.status(404).json({ message: "فایلی انتخاب نشده است." });
    files = Object.values(files).flat();

    const types = ["jpeg", "png", "webp"];

    files.forEach((file) => {
      if (!types.includes(file.mimetype.split("/")[1])) {
        removeTemp(file.tempFilePath);
        throw new Error("فرمت تصویر پشتیبانی نمی شود.");
      }
      if (file.size > 1024 * 1024 * 2) {
        removeTemp(file.tempFilePath);
        throw new Error("سایز تصویر باید کمتر از ۲ مگابایت باشد.");
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTemp = (path) => {
  fs.unlink(path, (error) => {
    throw error;
  });
};

export default imageUpload;
