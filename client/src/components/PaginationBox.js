import {useDispatch, useSelector} from 'react-redux';
import {changePage} from '../features/tasks/tasksSlice.js';
import {getAllTasks} from '../features/tasks/tasksThunk.js';
import styled from 'styled-components';

const PaginationBox = () => {
    const dispatch = useDispatch();
    const {numberOfPages, searchBoxValues: {page}} = useSelector(store => store.tasks);
    return (
        <Wrapper>
            {Array.from({length: numberOfPages}, (_, index) => {
                return (
                    <button key={index} onClick={() => {
                        dispatch(changePage(index + 1));
                        dispatch(getAllTasks());
                    }} className={page === index + 1 ? 'selected' : null}>{index + 1}</button>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    margin-top: 1rem;
    button {
        padding: 1rem;
        margin-right: 0.25rem;
        border: none;
        border: 1px solid black;
        border-radius: 1rem;

    }
    .selected {
        background-color: lightblue;
    }
`;

export default PaginationBox;