import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {createToken, createCookieWithToken} from '../utils';
import mongoose from 'mongoose';
import User from '../models/User';
import CustomError from '../errors';

export interface RequestWithUser extends Request {
    user?: {
        userID: mongoose.Schema.Types.ObjectId,
        name: string,
        email: string
    }
}

const showCurrentUser = async(req: RequestWithUser, res: Response) => {
    return res.status(StatusCodes.OK).json({user: req.user});
}

interface UpdateUserBody {
    name: string,
    email: string
}

const updateUser = async(req: Request<unknown, unknown, UpdateUserBody> & RequestWithUser, res: Response) => {
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const {name, email} = req.body;
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    await user.save();
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface UpdateUserPasswordBody {
    oldPassword: string,
    newPassword: string
}

const updateUserPassword = async(req: Request<unknown, unknown, UpdateUserPasswordBody> & RequestWithUser, res: Response) => {
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide old and new password!');
    }
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const isCorrect = await user.comparePassword(oldPassword);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Old Password!');
    }
    user.password = newPassword;
    await user.save();
    const token = createToken(user);
    createCookieWithToken(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

interface DeleteAccountBody {
    password: string
}

const deleteAccount = async(req: Request<unknown, unknown, DeleteAccountBody> & RequestWithUser, res: Response) => {
    const user = (await User.findOne({_id: req.user!.userID}))!;
    const {password} = req.body;
    if (!password) {
        throw new CustomError.BadRequestError('Please provide password!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Invalid Password!');
    }
    await user.deleteOne();
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({msg: 'Successfully Deleted Account!'});
}

export {
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteAccount
};