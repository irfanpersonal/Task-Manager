import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export interface IInput {
    name: string,
    email: string,
    password: string
}

// If you do not specify the type of your input when using the "registerUser" you 
// will get an error saying that it expected "0 arguments". So always specify the
// type of what you use.
export const registerUser = createAsyncThunk('user/registerUser', async(user: IInput, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/register', user);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async(user: IInput, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/auth/login', user);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const showCurrentUser = createAsyncThunk('user/showCurrentUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/user/showCurrentUser');
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/auth/logout');
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async(input: {name: string, email: string}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/user/updateUser`, input);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUserPassword = createAsyncThunk('user/updateUserPassword', async(input: {oldPassword: string, newPassword: string}, thunkAPI) => {
    try {
        const response = await axios.patch('/api/v1/user/updateUserPassword', input);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteAccount = createAsyncThunk('user/deleteAccount', async(input: {password: string}, thunkAPI) => {
    try {
        const response = await axios.delete('/api/v1/user/deleteAccount', {data: input});
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});