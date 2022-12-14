import jwt from "jsonwebtoken";

//  Verify JWT Token
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Generate JWT Token
export const generateToken = (userId, jwtSecretKey) => {
    try {
        let token = jwt.sign({ id: userId }, jwtSecretKey, {
            expiresIn: "1 day",
            algorithm: "HS384",
        });

        return token;
    } catch (err) {
        return { error: err.message };
    }
};
