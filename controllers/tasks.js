const {StatusCodes} = require('http-status-codes');
const Task = require('../models/Task.js');
const {NotFoundError} = require('../errors');

const showStats = async(req, res) => {
    const tasks = await Task.find({createdBy: req.user.userID});
    let completedTrue = 0, completedFalse = 0;
    tasks.forEach(task => {
        if (task.completed === true) {
            completedTrue += 1;
        }
        else {
            completedFalse += 1;
        }
    }); 
    return res.status(StatusCodes.OK).json({completedTrue, completedFalse});
}

const getAllTasks = async(req, res) => {
    const {search, completed, sort} = req.query;
    const queryObject = {
        createdBy: req.user.userID
    };
    if (search) {
        queryObject.name = {$regex: search, $options: ''};
    }
    if (completed && completed !== 'all') {
        queryObject.completed = completed;
    }
    let result = Task.find(queryObject);
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('name');
    }
    if (sort === 'z-a') {
        result = result.sort('-name');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const tasks = await result;
    const totalTasks = await Task.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalTasks / limit);
    return res.status(StatusCodes.OK).json({tasks, totalTasks, numberOfPages});
}

const createTask = async(req, res) => {
    req.body.createdBy = req.user.userID;
    const task = await Task.create(req.body);
    return res.status(StatusCodes.CREATED).json({task});
}

const getSingleTask = async(req, res) => {
    const {id} = req.params;
    const task = await Task.findOne({_id: id, createdBy: req.user.userID});
    if (!task) {
        throw new NotFoundError('No Task Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).json({task});
}

const updateSingleTask = async(req, res) => {
    const {id} = req.params;
    const task = await Task.findOne({_id: id, createdBy: req.user.userID});
    if (!task) {
        throw new NotFoundError('No Task Found with the ID Provided!');
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

const deleteSingleTask = async(req, res) => {
    const {id} = req.params;
    const task = await Task.deleteOne({_id: id, createdBy: req.user.userID});
    if (!task.deletedCount) {
        throw new NotFoundError('No Task Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).send();
}

module.exports = {
    showStats,
    getAllTasks,
    createTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask
};