import {createSlice} from '@reduxjs/toolkit';
import {getCurrentPageLocation} from '../../utils';
import {createTask, deleteSingleTask, editSingleTask, getSingleTask} from '../task/taskThunk';
import {deleteAccount} from '../user/userThunk';

const initialState = {
    location: getCurrentPageLocation()
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.fulfilled, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(deleteSingleTask.fulfilled, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(editSingleTask.fulfilled, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.location = state.location === '/landing' ? '/landing#' : '/landing';
        }).addCase(getSingleTask.rejected, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        });
    }
});

export const {setLocation} = navigationSlice.actions;

export default navigationSlice.reducer;