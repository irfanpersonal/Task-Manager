import styled from 'styled-components';
import {IoSearchOutline} from 'react-icons/io5';
import {useDispatch, useSelector} from 'react-redux';
import {type AppDispatch, type RootState} from '../store';
import {setSearch} from '../features/task/taskSlice';
import {getAllTasks} from '../features/task/taskThunk';

const SearchBox: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {search} = useSelector((store: RootState) => store.task);
    return (
        <Wrapper>
            <input type="search" name="search" value={search} onChange={(event) => dispatch(setSearch(event.target.value))}/>
            <IoSearchOutline className="search-icon" onClick={() => dispatch(getAllTasks())}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    border: 0.25rem solid white;
    border-radius: 1.5rem;
    padding: 0.5rem;
    margin: 0 auto;
    input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 1rem;
        padding: 0.5rem;
        border-radius: 2rem;
    }
    .search-icon {
        cursor: pointer;
        font-size: 1.5rem;
        margin-left: 0.5rem;
        color: black;
    }
`;

export default SearchBox;