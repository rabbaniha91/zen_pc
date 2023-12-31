import fs from "fs";
import autoBind from "auto-bind";
import cloudinary from "cloudinary";

class UploadController {
  constructor() {
    autoBind(this);
    cloudinary.config({
      cloud_name: process.env.CLOUDINAIRY_CLOUD_NAME,
      api_key: process.env.CLOUDINAIRY_API_KEY,
      api_secret: process.env.CLOUDINAIRY_API_SECRET,
    });
  }

  async uploadImag(req, res) {
    try {
      const { path } = req.body;
      if (!path) return res.status(401).json({ message: "Path is required" });
      const files = Object.values(req.files).flat();
      const images = [];
      for (let file of files) {
        let url = await this.#uploadToCloud(file, path);
        images.push(url);
        this.#removeTemp(file.tempFilePath);
      }

      return res.json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async #uploadToCloud(file, path) {
    try {
      const response = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: path,
      });

      return { url: response.secure_url };
    } catch (error) {
      console.log(error);
      this.#removeTemp(file.tempFilePath);
      throw new Error(error.error);
    }
  }

  async #removeTemp(path) {
    fs.unlink(path, (error) => {
     if (error) throw new Error("");
    });
  }
}

export default new UploadController()
