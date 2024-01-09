"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || 'Something went wrong, try again later!'
    };
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandler;
