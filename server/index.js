import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";
import {
    updatedUserProfile,
    userProfileUploaded,
} from "./controllers/users.js";
import { getTokenData } from "./utils/utils.js";

/* Configurations */
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
dotenv.config();

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        // create unique image name
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e10);
        const fileExtension = path.extname(file.originalname);
        const imageName = uniqueSuffix + fileExtension;

        // get user id from header
        const token = req.header("Authorization");
        const { id } = getTokenData(token, process.env.JWT_SECRET);

        // update user profile picture
        let imageUpdated = updatedUserProfile(id, imageName);

        imageUpdated
            .then(() => {
                cb(null, imageName);
            })
            .catch((err) => {
                cb(new Error(err).message);
            });
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post(
    "/upload-profile-picture",
    verifyToken,
    upload.single("picture"),
    userProfileUploaded
);

/* Routes */
app.use("/auth", authRoutes);
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
