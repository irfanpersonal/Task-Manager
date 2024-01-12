import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {createTask, deleteSingleTask, editSingleTask, getAllTasks, getSingleTask, getSingleTaskForEditing} from "./taskThunk";
import {toast} from 'react-toastify';

export interface TaskItem {
    _id: string,
    name: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
}

interface TaskState {
    isLoading: boolean,
    tasks: TaskItem[],
    page: number,
    totalTasks: number | null,
    numberOfPages: number | null,
    search: string,
    isEditing: boolean,
    createTaskLoading: boolean,
    getSingleTaskLoading: boolean,
    singleTask: TaskItem | null,
    inputValues: {
        [index: string]: any,
        name: string, completed: boolean | null, id: string | null
    },
    getSingleTaskForEditingLoading: boolean,
    editTaskLoading: boolean
}

const initialState: TaskState = {
    isLoading: true,
    tasks: [],
    page: 1,
    totalTasks: null,
    numberOfPages: null,
    search: '',
    isEditing: false,
    createTaskLoading: false,
    getSingleTaskLoading: true,
    singleTask: null,
    inputValues: {name: '', completed: null, id: null},
    getSingleTaskForEditingLoading: false,
    editTaskLoading: false
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setIsEditingTrue: (state) => {
            state.isEditing = true;
        },
        setIsEditingFalse: (state) => {
            state.isEditing = false;
        },
        updateInputValues: (state, action: PayloadAction<{name: string, value: string}>) => {
            state.inputValues[action.payload.name] = action.payload.value;
        },
        resetInputValues: (state) => {
            state.inputValues = {name: '', completed: null, id: null};
            state.isEditing = false;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.tasks;
            state.totalTasks = action.payload.totalTasks;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllTasks.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(createTask.pending, (state) => {
            state.createTaskLoading = true;
        }).addCase(createTask.fulfilled, (state) => {
            state.createTaskLoading = false;
            state.inputValues.name = '';
            toast.success('Created Task!');
        }).addCase(createTask.rejected, (state, action) => {
            state.createTaskLoading = false;
            toast.error(action.payload as string);
        }).addCase(getSingleTask.pending, (state) => {
            state.getSingleTaskLoading = true;
        }).addCase(getSingleTask.fulfilled, (state, action) => {
            state.getSingleTaskLoading = false;
            state.singleTask = action.payload;
        }).addCase(getSingleTask.rejected, (state) => {
            state.getSingleTaskLoading = true;
        }).addCase(getSingleTaskForEditing.pending, (state) => {
            state.getSingleTaskForEditingLoading = true;
        }).addCase(getSingleTaskForEditing.fulfilled, (state, action) => {
            state.getSingleTaskForEditingLoading = false;
            state.inputValues = action.payload;
            state.inputValues.id = action.payload._id;
        }).addCase(getSingleTaskForEditing.rejected, (state) => {
            state.getSingleTaskForEditingLoading = false;
        }).addCase(deleteSingleTask.fulfilled, (state) => {
            toast.success('Deleted Task!');
        }).addCase(editSingleTask.pending, (state) => {
            state.editTaskLoading = true;
        }).addCase(editSingleTask.fulfilled, (state) => {
            state.editTaskLoading = false;
            toast.success('Edited Task!');
        }).addCase(editSingleTask.rejected, (state, action) => {
            state.editTaskLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {setPage, setIsEditingTrue, setIsEditingFalse, updateInputValues, resetInputValues, setSearch} = taskSlice.actions;

export default taskSlice.reducer;