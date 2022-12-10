import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken, verifyToken } from "../middleware/auth.js";
import { getTokenData } from "../utils/utils.js";

/* Routes: / */
export const welcome = (req, res) => {
    try {
        res.status(200).json({
            msg: "welcome to wanda",
        });
    } catch (err) {
        res.status(500).json({ msg: `Error happened` });
    }
};

/* Routes: /register */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
    }
};

/* Routes: /auth/login */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials. " });

        const token = generateToken(user._id, process.env.JWT_SECRET);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.picturePath,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
    }
};

// update user profile picture in db
export const updatedUserProfile = async (id, imageName) => {
    const user = await User.findById(id);

    if (user && imageName) {
        user.picturePath = imageName;
        await user.save();
    } else {
        throw new Error("User profile picture did not updated");
    }
};

// Routes: /upload-profile-picture
export const userProfileUploaded = async (req, res) => {
    try {
        res.status(200).json({ msg: "Profile picture updated succesfully!" });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
    }
};
