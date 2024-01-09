import jwt from 'jsonwebtoken';
import {Response} from 'express';
import {IUser} from '../models/User';

const createToken = (user: IUser) => {
    return jwt.sign(
        {userID: user._id, name: user.name, email: user.email},
        process.env.JWT_SECRET as string,
        {expiresIn: process.env.JWT_LIFETIME}
    );
}

const createCookieWithToken = (res: Response, token: string) => {
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export {
    createToken,
    createCookieWithToken,
    verifyToken
};