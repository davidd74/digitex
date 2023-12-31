import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import UserProfileRoute from "./routes/UserProfileRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import bcrypt from "bcrypt";

const { MONGO_URL, PORT } = process.env;
const app = express();

mongoose
  .connect(`${MONGO_URL}digitex`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// const new_password = "david";
// const salt = await bcrypt.genSalt(10);
// const hashedPw = await bcrypt.hash(new_password, salt);
// console.log(hashedPw);

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", AuthRoute);
app.use("/products", ProductRoute);
app.use("/user", UserProfileRoute);
app.use("/", OrderRoute);
