import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';
import {createToken, createCookieWithToken} from '../utils';
import User from '../models/User';
import CustomError from '../errors';

interface IRegisterBody {
    name: string,
    email: string,
    password: string
}

const register = async(req: Request<unknown, unknown, IRegisterBody>, res: Response) => {
    const {name, email, password} = req.body;
    const user = await User.create({name, email, password});
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email,
    }});
}

interface ILoginBody {
    email: string,
    password: string
}

const login = async(req: Request<unknown, unknown, ILoginBody>, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password!');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new CustomError.BadRequestError('No User Found with the Email Provided!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Password!');
    }
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email,
    }});
}

const logout = async(req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({msg: 'Successfully Logged Out!'});
}

export {
    register,
    login,
    logout
};