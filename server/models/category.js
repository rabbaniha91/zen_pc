import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  title: { type: String, trim: true, text: true, required: true },
  mainID: { type: String, trim: true, required: true },
  subTitles: [
    {
      title: { type: String, trim: true, text: true },
      subTitle: [
        {
          title: { type: String, trim: true, text: true },
          picture: {
            type: String,
            trim: true,
            default: "/noun-default-image-5191452.svg",
          },
        },
      ],
      picture: {
        type: String,
        trim: true,
        default: "/noun-default-image-5191452.svg",
      },
    },
  ],
});

export default mongoose.model("Category", categorySchema);
