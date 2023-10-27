import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {updateSearchBoxValues} from '../features/tasks/tasksSlice.js';
import {getAllTasks} from '../features/tasks/tasksThunk.js';

const SearchBox = () => {
    const dispatch = useDispatch();
    const {searchBoxValues} = useSelector(store => store.tasks);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getAllTasks());
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>Search Box</h1>
                <div>
                    <label htmlFor="search">Search</label>
                    <input id="search" type="search" name="search" value={searchBoxValues.search} onChange={(event) => dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <select id="completed" name="completed" value={searchBoxValues.completed} onChange={(event) => dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}))}>
                        <option value="all">All</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort</label>
                    <select id="sort" name="sort" value={searchBoxValues.sort} onChange={(event) => dispatch(updateSearchBoxValues({name: event.target.name, value: event.target.value}))}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>
                <button type="submit" style={{marginTop: '1rem'}}>Update Search Result</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        border: 1px solid black;
        padding: 1rem;
        width: 50%;
        background-color: white;
        border-radius: 0.5rem;
    }
    h1 {
        text-align: center;
        background-color: black;
        color: white;
    }
    label, input, button, select {
        display: block;
    }
    label {
        margin-top: 1rem;
    }
    input {
        margin-bottom: 1rem;
    }
    button, input, select {
        width: 100%;
        padding: 0.5rem;
    }
    p {
        text-align: center;
        margin-bottom: 1rem;
    }
    span {
        background-color: lightgray;
        border: 1px solid black;
        display: inline-block;
        padding: 0.10rem 1.5rem;
        margin-left: 0.25rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
`;

export default SearchBox;