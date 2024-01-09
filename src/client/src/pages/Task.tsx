import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {type RootState, type AppDispatch} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteSingleTask, getSingleTask, getSingleTaskForEditing} from '../features/task/taskThunk';
import {Loading} from '../components';
import {FaArrowCircleLeft, FaEdit, FaTrash} from "react-icons/fa";
import {setIsEditingTrue} from '../features/task/taskSlice';

const Task: React.FunctionComponent = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {getSingleTaskLoading, singleTask} = useSelector((store: RootState) => store.task);
    React.useEffect(() => {
        dispatch(getSingleTask(id as string));
    }, []);
    return (
        <>
            {getSingleTaskLoading ? (
                <Loading/>
            ) : (
                <Wrapper>
                    <div className="container">
                        <Link to='/' title="Back"><FaArrowCircleLeft className="icon" style={{marginRight: '1rem'}}/></Link>
                        <div>
                            <FaEdit title="Edit" onClick={() => {
                                navigate('/add-task');
                                dispatch(setIsEditingTrue());
                                dispatch(getSingleTaskForEditing(id as string));
                            }} className="icon" style={{marginLeft: '1rem', cursor: 'pointer'}}/>
                            <FaTrash title="Delete" onClick={() => {
                                dispatch(deleteSingleTask(id as string));
                            }} className="icon" style={{marginLeft: '1rem', cursor: 'pointer'}}/>
                        </div>
                    </div>
                    <h1>{singleTask!.name}</h1>
                    <h1>{String(singleTask!.completed)}</h1>
                    <h1>{moment(singleTask!.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h1>
                </Wrapper>
            )}
        </>
    );
}

const Wrapper = styled.div`
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid black;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .icon {
        font-size: 1.5rem;
    }
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    h1 {
        margin: 1rem 0;
        color: #333;
    }
`;

export default Task;