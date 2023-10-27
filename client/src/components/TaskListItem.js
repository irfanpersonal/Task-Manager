import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {deleteTask, getSingleTask} from '../features/tasks/tasksThunk.js';
import {useNavigate} from 'react-router-dom';
import {isEditingTrue} from '../features/tasks/tasksSlice.js';

const TaskListItem = ({data}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {name, completed, _id: id} = data;
    return (
        <Wrapper>
            <h1>{name}</h1>
            <h1>{String(completed)}</h1>
            <button onClick={() => {
                navigate('/add-task');
                dispatch(isEditingTrue());
                dispatch(getSingleTask(id));
            }}>EDIT</button>
            <button onClick={() => dispatch(deleteTask(id))}>DELETE</button>
        </Wrapper>
    );
}

const Wrapper = styled.article`
    background-color: rgb(210,211,219);
    border: 1px solid black;
    color: black;
    padding: 1rem;
    text-align: center; 
    border-radius: 1rem;
    h1 {
        margin: 1rem 0;
    }
    button {
        width: 50%;
        padding: 0.5rem;
    }
`;

export default TaskListItem;