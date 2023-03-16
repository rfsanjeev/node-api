import jwt from "jsonwebtoken";

const createToken = (userId, jwtKey) => {
    return jwt.sign({ userId: userId}, jwtKey, { expiresIn: '1h'});
}

const verifyToken = (token, jwtKey) => {
    return jwt.verify(token, jwtKey);
}

export {createToken, verifyToken};