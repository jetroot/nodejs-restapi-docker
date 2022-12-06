import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";

import userRoutes from "./routes/users.js";
import mongoose from "mongoose";

/* Configurations */
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
dotenv.config();

/* Routes */
app.use("/", userRoutes);

/* Mongoose Setup */
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        /* Start application */
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((err) => console.error(`${err} did not connect`));
