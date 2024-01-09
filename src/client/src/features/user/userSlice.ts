import {createSlice} from "@reduxjs/toolkit";
import {deleteAccount, loginUser, logoutUser, registerUser, showCurrentUser, updateUser, updateUserPassword} from "./userThunk";
import {type PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

interface User {
    userID: string,
    name: string,
    email: string
}

interface UserState {
    wantsToRegister: boolean,
    globalLoading: boolean,
    authLoading: boolean,
    user: User | null,
    signOutLoading: boolean,
    updateUserLoading: boolean,
    deleteAccountLoading: boolean
}

const initialState: UserState = {
    wantsToRegister: true,
    globalLoading: true,
    authLoading: false,
    user: null,
    signOutLoading: false,
    updateUserLoading: false,
    deleteAccountLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Note: If you add the action as an argument to your "toggleAuthType" 
        // function, it will start complaining if you don't pass in atleast 1
        // argument when using the method. So if you don't plan on using it
        // just leave it out.
        toggleAuthType: (state) => {
            state.wantsToRegister = !state.wantsToRegister;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => { // PayloadAction is a generic type where we pass in the type for the action. 
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Registered User!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error((action.payload as string));
        }).addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(showCurrentUser.pending, (state) => {
            state.globalLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.globalLoading = false;
            state.user = action.payload;
        }).addCase(showCurrentUser.rejected, (state) => {
            state.globalLoading = false;
        }).addCase(logoutUser.pending, (state) => {
            state.signOutLoading = true;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.signOutLoading = false;
            state.user = null;
            toast.success('Successfully Logged Out!');
        }).addCase(logoutUser.rejected, (state) => {
            state.signOutLoading = false;
            toast.error('Failed to Logout!');
        }).addCase(updateUser.pending, (state) => {
            state.updateUserLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            state.user = action.payload;
            toast.success('Edited User!');
        }).addCase(updateUser.rejected, (state, action) => {
            state.updateUserLoading = false;
            toast.error(action.payload as string);
        }).addCase(updateUserPassword.pending, (state) => {
            state.updateUserLoading = true;
        }).addCase(updateUserPassword.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            toast.success('Upated User Password!');
        }).addCase(updateUserPassword.rejected, (state, action) => {
            state.updateUserLoading = false;
            toast.error(action.payload as string);
        }).addCase(deleteAccount.pending, (state) => {
            state.deleteAccountLoading = true;
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.deleteAccountLoading = false;
            state.user = null;
            toast.success('Deleted Account!');
        }).addCase(deleteAccount.rejected, (state, action) => {
            state.deleteAccountLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {toggleAuthType} = userSlice.actions;

export default userSlice.reducer;