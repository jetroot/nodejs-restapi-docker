import jwt from "jsonwebtoken";

// Get token data
export const getTokenData = (token, jwtSecretKey) => {
    try {
        token = token.slice(7, token.length).trimLeft();
        const data = jwt.verify(token, jwtSecretKey);
        return data;
    } catch (err) {
        return null;
    }
};
