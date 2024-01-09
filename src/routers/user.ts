import express from 'express';
const router: express.Router = express.Router();

import {updateUser, updateUserPassword, deleteAccount, showCurrentUser} from '../controllers/user';

router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/showCurrentUser').get(showCurrentUser);
router.route('/deleteAccount').delete(deleteAccount);

export default router;