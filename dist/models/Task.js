"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Task Name'],
        minLength: 6
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Must Provide Task User'],
        ref: 'User'
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Task', taskSchema);
