const {UnauthorizedError} = require('../errors');
// const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        const authorizedHeader = req.headers.authorization;
        if (!authorizedHeader || !authorizedHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('Missing/Invalid Bearer Token');
        }
        const token = authorizedHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userID, name, email} = decoded;
        req.user = {userID, name, email};
        next();
    }
    catch(error) {
        throw new UnauthorizedError('Not authorized to access this route!');
    }
}

module.exports = authentication;