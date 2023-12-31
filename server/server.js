import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import cors from "cors";
import "dotenv/config";

import connectToMongoDB from "./config/dbConfig.js";
import corsOption from "./config/corsoption.js";
import authRouter from "./routes/authRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import publicRouter from "./routes/publicRoute.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRoutes.js";
import credentials from "./middlewares/credentials.js";
import registerToPostex from "./config/registerPostex.js";





const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
connectToMongoDB(MONGO_URL);
registerToPostex()

app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", publicRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1/user", userRouter);

mongoose.connection.once("open", () => {
  console.log("Connection Succed");
  app.listen(PORT, () => {
    console.log("Server Run On Port ", PORT);
  });
});
