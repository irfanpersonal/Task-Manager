import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';
import {GiExitDoor} from 'react-icons/gi';
import {logoutUser} from '../features/user/userSlice.js';
import {useDispatch} from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Wrapper>
            <h1>Task Manager</h1>
            <div>
                <NavLink to='/'>Stats</NavLink>
                <NavLink to='/all-tasks'>All Tasks</NavLink>
                <NavLink to='/add-task'>Add Task</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                <span onClick={() => {
                    dispatch(logoutUser());
                    navigate('/landing');
                }}><GiExitDoor/></span>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgb(170, 200, 167);
    a {
        text-decoration: none;
        margin-left: 1rem;
        color: black;
    }
    span {
        margin-left: 1rem;
        cursor: pointer;
        background-color: lightgray;
        border: 1px solid black;
        padding: 0.5rem;
        border-radius: 50%;
    }
    .active {
        border-bottom: 1px solid black;
    }
`;

export default Navbar;