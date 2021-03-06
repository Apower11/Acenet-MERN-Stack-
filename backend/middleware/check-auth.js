const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        // Get token
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if(!token) {
            throw new Error('Authentication failed!');
        }
        // Verify token
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch(err) {
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
};