import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {type RootState} from '../../store';

export const getAllTasks = createAsyncThunk('task/getAllTasks', async(_, thunkAPI) => {
    try {
        const {page, search} = (thunkAPI.getState() as RootState).task;
        const response = await axios.get(`/api/v1/task?search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export interface ICreateTask {
    name: string,
    completed?: boolean | null
}

export const createTask = createAsyncThunk('task/createTask', async(task: ICreateTask, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/task', task);
        const data = response.data;
        return data.task;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleTask = createAsyncThunk('task/getSingleTask', async(taskID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/task/${taskID}`);
        const data = response.data;
        return data.task;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleTaskForEditing = createAsyncThunk('task/getSingleTaskForEditing', async(taskID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/task/${taskID}`);
        const data = response.data;
        return data.task;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSingleTask = createAsyncThunk('task/deleteSingleTask', async(taskID: string, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/task/${taskID}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSingleTask = createAsyncThunk('task/editSingleTask', async(taskDetails: {id: string, name: string, completed: string}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/task/${taskDetails.id}`, {name: taskDetails.name, completed: taskDetails.completed});
        const data = response.data;
        return data.task;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});