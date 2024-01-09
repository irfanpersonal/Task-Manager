import {setPage} from "../features/task/taskSlice";
import {getAllTasks} from "../features/task/taskThunk";
import {type RootState, type AppDispatch} from "../store";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

const PaginationBox: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {numberOfPages, page} = useSelector((store: RootState) => store.task);
    return (
        <Wrapper>
            {Array.from({length: numberOfPages as number}, (value, index) => {
                return (
                    <span onClick={() => {
                        dispatch(setPage(index + 1));
                        dispatch(getAllTasks());
                    }} style={{backgroundColor: `${index + 1 === page && 'black'}`, color: `${index + 1 === page && 'white'}`}}>{index + 1}</span>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    span {
        cursor: pointer;
        padding: 0.5rem 1rem;
        margin: 0 4px;
        background-color: white;
        color: black;
        border: 1px solid black;
        border-radius: 0.25rem;
        transition: background-color 0.3s;
    }
`;

export default PaginationBox;