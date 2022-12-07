import bcrypt from "bcrypt";
import User from "../models/User.js";

/* Routes: / */
export const welcome = (req, res) => {
    try {
        res.status(200).json({ msg: "welcome mvc" });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
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
export const login = (req, res) => {
    try {
        res.status(200).json({ msg: "login mvc" });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` });
    }
};
