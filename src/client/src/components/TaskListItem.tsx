import {type TaskItem} from '../features/task/taskSlice';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

interface TaskListItemProps {
    data: TaskItem
}

const TaskListItem: React.FunctionComponent<TaskListItemProps> = ({data}) => {
    return (
        <Wrapper to={`/task/${data._id}`}>
            <div>
                <h1>{data.name}</h1>
            </div>
            <div className={`circle ${data.completed ? 'completed' : 'not-completed'}`}></div>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    text-decoration: none;
    color: black;
    background-color: white;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .circle {
        width: 1rem;
        height: 1rem; 
        border-radius: 50%;
    }
    .completed {
        background-color: green;
    }
    .not-completed {
        background-color: red;
    }
`;

export default TaskListItem;