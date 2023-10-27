const express = require('express');
const router = express.Router();

const {showStats, getAllTasks, createTask, getSingleTask, updateSingleTask, deleteSingleTask} = require('../controllers/tasks.js');

router.route('/').get(getAllTasks).post(createTask);
router.route('/stats').get(showStats);
router.route('/:id').get(getSingleTask).patch(updateSingleTask).delete(deleteSingleTask);

module.exports = router;