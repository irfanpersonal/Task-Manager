import express from 'express';
const router: express.Router = express.Router();

import {getAllTasks, createTask, getSingleTask, updateSingleTask, deleteSingleTask} from '../controllers/task';

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateSingleTask).delete(deleteSingleTask);

export default router;