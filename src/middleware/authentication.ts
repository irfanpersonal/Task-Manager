import {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../utils';
import CustomError from '../errors';

interface IRequest extends Request {
    [index: string]: any
}

const authentication = (req: IRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.signedCookies.token;
        if (!token) {
            throw new CustomError.UnauthorizedError('Missing/Invalid Token');
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch(error) {
        throw new CustomError.UnauthorizedError('Failed to Authenticate User!');
    }
}

export default authentication;