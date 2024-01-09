import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './features/navigation/navigatonSlice';
import userReducer from './features/user/userSlice';
import taskReducer from './features/task/taskSlice';

const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        user: userReducer,
        task: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
// This line of code basically gets us the type for the store. So that when we use 
// the "useSelector" hook and it complains about not specifying the type like 
// this: const { somevalue } = useSelector(store => store.something); We can then 
// use this RootState type to fix it like this:
// const { somevalue } = useSelector((store: RootState) => store.something);
// Now you will get no error.

export type AppDispatch = typeof store.dispatch;
// This line of code basically gets us the type for the dispatch. So that when we use
// the "useDispatch" hook and it complains about not specifying the type like this:
// const dispatch = useDispatch();
// All we have to do is go to the useDispatch hook and specify the type as "AppDispatch"
// so like this:
// const dispatch = useDispatch<AppDispatch>();

export default store;