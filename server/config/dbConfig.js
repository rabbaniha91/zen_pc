import mongoose from "mongoose";

const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
