import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import tasksReducer from './features/tasks/tasksSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer
    }
});

export default store;