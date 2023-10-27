import {createAsyncThunk} from '@reduxjs/toolkit';
import customFetch from '../../utils.js';
import { logoutUser } from '../user/userSlice.js';

export const showStats = createAsyncThunk('tasks/showStats', async(_, thunkAPI) => {
    try {
        const response = await customFetch.get('/tasks/stats');
        const data = response.data;
        return data;
    }   
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', async(_, thunkAPI) => {
    try {
        const {searchBoxValues: {search, completed, sort, page}} = thunkAPI.getState().tasks;
        const response = await customFetch.get(`/tasks?search=${search}&completed=${completed}&sort=${sort}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(taskID, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/tasks/${taskID}`);
        const data = response.data;
        thunkAPI.dispatch(getAllTasks());
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleTask = createAsyncThunk('tasks/getSingleTask', async(taskID, thunkAPI) => {
    try {
        const response = await customFetch.get(`/tasks/${taskID}`);
        const data = response.data;
        return data.task;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateSingleTask = createAsyncThunk('tasks/updateSingleTask', async({taskID, task}, thunkAPI) => {
    try {
        const response = await customFetch.patch(`/tasks/${taskID}`, task);
        const data = response.data;
        return data.task;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const createTask = createAsyncThunk('tasks/createTask', async(task, thunkAPI) => {
    try {
        const response = await customFetch.post('/tasks', task);
        const data = response.data;
        return data.task;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});