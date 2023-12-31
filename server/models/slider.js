import mongoose, { Schema } from "mongoose";

const SliderSchema = new Schema({
  picture: { type: String, required: true, trim: true },
  title: { type: String, trim: true, default: "" },
  content: { type: String, trim: true, default: "" },
});

export default mongoose.model("Slider", SliderSchema);
