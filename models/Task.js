const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Task Name'],
        minLength: 5
    },
    completed: {
        type: Boolean,
        default: 'false'
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Must Provide Task CreatedBy']
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);