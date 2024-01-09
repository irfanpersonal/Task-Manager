import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {resetInputValues} from '../features/task/taskSlice';

const Navbar: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Wrapper>
            <h1>Task Manager</h1>
            <div>
                <NavLink to='/'>Home</NavLink>
                <NavLink onClick={() => {
                    dispatch(resetInputValues());
                }} to='/add-task'>Add Task</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(to right, rgb(123, 211, 234), rgb(161, 238, 189));
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    h1 {
        color: black;
    }
    a {
        text-decoration: none;
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        margin-left: 1rem;
        &:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
        }
    }
    .active {
        outline: 1px solid black;
    }
`;

export default Navbar;