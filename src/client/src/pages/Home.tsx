import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from '../store';
import {getAllTasks} from '../features/task/taskThunk';
import {SearchBox, TaskList, PaginationBox, Loading} from '../components';

const Home: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {isLoading, tasks, numberOfPages} = useSelector((store: RootState) => store.task);
    React.useEffect(() => {
        dispatch(getAllTasks());
    }, []);
    return (
        <>
            <SearchBox/>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                    <TaskList data={tasks}/>
                    {numberOfPages! > 1 && (
                        <PaginationBox/>
                    )}
                </>
            )}
        </>
    );
}

export default Home;