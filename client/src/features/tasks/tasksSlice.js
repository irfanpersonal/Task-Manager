import {createSlice} from '@reduxjs/toolkit';
import {showStats, getAllTasks, deleteTask, getSingleTask, updateSingleTask, createTask} from './tasksThunk.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: false,
    statValues: {},
    tasks: [],
    totalTasks: '',
    numberOfPages: '',
    searchBoxValues: {
        search: '',
        completed: 'all',
        sort: 'latest',
        page: 1
    },
    isEditing: false,
    editTaskValues: {
        name: '',
        completed: '',
        id: ''
    }
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateSearchBoxValues: (state, action) => {
            state.searchBoxValues.page = 1;
            state.searchBoxValues[action.payload.name] = action.payload.value;
        },
        changePage: (state, action) => {
            state.searchBoxValues.page = action.payload;
        },
        isEditingTrue: (state, action) => {
            state.isEditing = true;
        },
        isEditingFalse: (state, action) => {
            state.isEditing = false;
        },
        updateEditTaskValues: (state, action) => {
            state.editTaskValues[action.payload.name] = action.payload.value;
        },
        resetEditTaskValues: (state, action) => {
            state.editTaskValues = {
                name: '',
                completed: '',
                id: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showStats.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(showStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.statValues = action.payload;
        }).addCase(showStats.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(getAllTasks.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.tasks;
            state.totalTasks = action.payload.totalTasks;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllTasks.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(deleteTask.fulfilled, (state, action) => {
            toast.success('Deleted Task!');
        }).addCase(deleteTask.rejected, (state, action) => {
            toast.error(action.payload);
        }).addCase(getSingleTask.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getSingleTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.editTaskValues.name = action.payload.name;
            state.editTaskValues.completed = action.payload.completed;
            state.editTaskValues.id = action.payload._id;
        }).addCase(getSingleTask.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(updateSingleTask.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateSingleTask.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Updated Task');
        }).addCase(updateSingleTask.rejected, (state, action) => {
            toast.error(action.payload);
        }).addCase(createTask.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Created Task');
        }).addCase(createTask.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        });
    }
});

export const {updateSearchBoxValues, changePage, isEditingTrue, isEditingFalse, updateEditTaskValues, resetEditTaskValues} = tasksSlice.actions;

export default tasksSlice.reducer;