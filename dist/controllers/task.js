"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleTask = exports.updateSingleTask = exports.getSingleTask = exports.createTask = exports.getAllTasks = void 0;
const http_status_codes_1 = require("http-status-codes");
const Task_1 = __importDefault(require("../models/Task"));
const errors_1 = __importDefault(require("../errors"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, completed } = req.query;
    const queryObject = {
        user: req.user.userID
    };
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if (completed) {
        queryObject.completed = completed;
    }
    let result = Task_1.default.find(queryObject).populate('user');
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const tasks = yield result;
    const totalTasks = yield Task_1.default.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalTasks / limit);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ tasks, totalTasks, numberOfPages });
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user.userID;
    const task = yield Task_1.default.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
exports.createTask = createTask;
const getSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield Task_1.default.findOne({ _id: id, user: req.user.userID });
    if (!task) {
        throw new errors_1.default.NotFoundError('No Task Found with the ID Provided!');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
exports.getSingleTask = getSingleTask;
const updateSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield Task_1.default.findOne({ _id: id, user: req.user.userID });
    if (!task) {
        throw new errors_1.default.NotFoundError('No Task Found with the ID Provided!');
    }
    const { name, completed } = req.body;
    if (name) {
        task.name = name;
    }
    if (completed) {
        task.completed = completed;
    }
    yield task.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
exports.updateSingleTask = updateSingleTask;
const deleteSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield Task_1.default.deleteOne({ _id: id });
    if (!task.deletedCount) {
        throw new errors_1.default.NotFoundError('No Task Found with the ID Provided!');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).send();
});
exports.deleteSingleTask = deleteSingleTask;
