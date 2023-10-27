import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {getAllTasks} from '../features/tasks/tasksThunk.js';
import {SearchBox, TaskList, PaginationBox} from '../components';

const AllTasks = () => {
    const dispatch = useDispatch();
    const {isLoading, tasks, totalTasks} = useSelector(store => store.tasks);
    React.useEffect(() => {
        dispatch(getAllTasks());
    }, []);
    if (isLoading) {
        return (
            <h1 style={{backgroundColor: 'black', color: 'white', textAlign: 'center'}}>Loading...</h1>
        );
    }
    return (
        <>
            <SearchBox/>
            <TaskList data={tasks}/>
            {totalTasks > 10 && (<PaginationBox/>)}
        </>
    );
}

export default AllTasks;