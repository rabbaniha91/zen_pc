import mongoose, { Schema } from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const productSchema = new Schema({
  title: { type: String, required: true, trim: true, text: true },
  producer: { type: String, required: true, trim: true, text: true },
  price: { type: String, required: true, trim: true, text: true },
  offer: { type: Number, trim: true, text: true, default: 0 },
  inventory: { type: Number, trim: true, default: 0 },
  category: {
    generalCategory: { type: String, trim: true, text: true, required: true },
    subCategory: { type: String, trim: true, text: true, required: true },
    mainCategory: { type: String, trim: true, text: true, default: "" },
  },
  model: { type: String, required: true, trim: true, text: true },
  scores: [
    {
      scoreBy: { type: Schema.Types.ObjectId, ref: "User" },
      score: { type: Number, default: 0 },
    },
  ],
  comments: [
    {
      commentBy: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, trim: true, text: true, default: "" },
      commentAt: {
        type: Date,
        default: new Date(),
      },
      like: {
        likers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        count: {type: Number, default: 0 },
      },
      disLike: {
        disLikers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        count: {type: Number, default: 0 },
      },
    },
  ],

  keyFeatures: [
    {
      title: { type: String, required: true },
      featureValue: { type: String, required: true },
    },
  ],

  cover: { type: String, default: "/noun-default-image-5191452.png" },
  pictures: [String],
  featuresTitle: [String],

  featuresValue: [
    {
      title: { type: String, required: true },
      featureValue: { type: String, required: true },
      index: { type: Number, required: true, text: true },
    },
  ],

  createdAt: { type: Date, default: new Date() },
});

productSchema.plugin(aggregatePaginate);

export default mongoose.model("Product", productSchema);
