import mongoose, { Schema } from "mongoose";

const PostexSchema = new Schema({
  registred: { type: Boolean, default: false, required: true },
});

export default mongoose.model("Postex", PostexSchema);
