import TaskListItem from './TaskListItem.js';
import styled from 'styled-components';

const TaskList = ({data}) => {
    if (!data.length) {
        return (
            <h1 style={{backgroundColor: 'rgb(246, 255, 222)', margin: '1rem 0', border: '1px solid black', textAlign: 'center'}}>No Tasks...</h1>
        );
    }
    return (
        <div>
            <h1 style={{backgroundColor: 'rgb(246, 255, 222)', margin: '1rem 0', border: '1px solid black', textAlign: 'center'}}>{data.length} Task{data.length === 1 ? null : 's'} Found!</h1>
            <Wrapper>
                {data.map(item => {
                    return (
                        <TaskListItem key={item._id} data={item}/>
                    );
                })}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    background-color: white;
    margin-top: 1rem;
`;

export default TaskList;