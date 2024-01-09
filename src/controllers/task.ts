import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {RequestWithUser} from './user';
import Task from '../models/Task';
import mongoose from 'mongoose';
import CustomError from '../errors';

interface GetAllTasksQuery {
    search: string,
    completed: boolean,
    limit: string,
    page: string
}

const getAllTasks = async(req: RequestWithUser & Request<unknown, unknown, unknown, GetAllTasksQuery>, res: Response) => {
    const {search, completed} = req.query;
    const queryObject: {[index: string]: any} = {
        user: req.user!.userID
    };
    if (search) {
        queryObject.name = {$regex: search, $options: 'i'};
    }
    if (completed) {
        queryObject.completed = completed;
    }
    let result = Task.find(queryObject).populate('user');
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const tasks = await result;
    const totalTasks = await Task.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalTasks / limit);
    return res.status(StatusCodes.OK).json({tasks, totalTasks, numberOfPages});
}

const createTask = async(req: RequestWithUser & Request, res: Response) => {
    req.body.user = req.user!.userID;
    const task = await Task.create(req.body);
    return res.status(StatusCodes.OK).json({task});
}

interface TaskParams {
    id: mongoose.Schema.Types.ObjectId
}

const getSingleTask = async(req: RequestWithUser & Request<TaskParams>, res: Response) => {
    const {id} = req.params;
    const task = await Task.findOne({_id: id, user: req.user!.userID});
    if (!task) {
        throw new CustomError.NotFoundError('No Task Found with the ID Provided!');
    }   
    return res.status(StatusCodes.OK).json({task});
}

interface UpdateSingleTaskBody {
    name: string,
    completed: boolean
}

const updateSingleTask = async(req: RequestWithUser & Request<TaskParams, unknown, UpdateSingleTaskBody>, res: Response) => {
    const {id} = req.params;
    const task = await Task.findOne({_id: id, user: req.user!.userID});
    if (!task) {
        throw new CustomError.NotFoundError('No Task Found with the ID Provided!');
    }
    const {name, completed} = req.body;
    if (name) {
        task.name = name;
    }
    if (completed) {
        task.completed = completed;
    }
    await task.save();
    return res.status(StatusCodes.OK).json({task});
}

const deleteSingleTask = async(req: RequestWithUser & Request<TaskParams>, res: Response) => {
    const {id} = req.params;
    const task = await Task.deleteOne({_id: id});
    if (!task.deletedCount) {
        throw new CustomError.NotFoundError('No Task Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).send();
}

export {
    getAllTasks,
    createTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask
};