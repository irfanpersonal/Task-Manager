import mongoose from 'mongoose';

interface ITask extends mongoose.Document {
    name: string,
    completed: boolean,
    user: mongoose.Schema.Types.ObjectId
}

const taskSchema = new mongoose.Schema<ITask>({
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
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Must Provide Task User'],
        ref: 'User'
    }
}, {timestamps: true});

export default mongoose.model<ITask>('Task', taskSchema);