import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Frist name is required"],
    trim: true,
    text: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    text: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    text: true,
  },
  mobileNumber: { type: String, trim: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    text: true,
  },
  address: [
    {
      firstName: {
        type: String,
        required: [true, "firstName is required"],
        trim: true,
        text: true,
      },
      lastName: {
        type: String,
        required: [true, "lastName is required"],
        trim: true,
        text: true,
      },
      phoneNumber: {
        type: String,
        required: [true, "phoneNumber is required"],
        trim: true,
        text: true,
      },
      province: {
        type: String,
        required: [true, "State is required"],
        trim: true,
        text: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        text: true,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        text: true,
      },
      cityName: {
        type: String,
        required: [true, "cityName is required"],
        trim: true,
        text: true,
      },
      provinceName: {
        type: String,
        required: [true, "provinceName is required"],
        trim: true,
        text: true,
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
        text: true,
      },
      default: { type: Boolean, default: false },
    },
  ],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  refreshToken: [String],
  emailAuthCode: { type: String, trim: true },
  mobileAuthCode: { type: String, trim: true },
  verified: { type: Boolean, default: false },
  picture: {
    type: String,
    trim: true,
    default: "/images/1389952697.svg",
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model("User", userSchema);
