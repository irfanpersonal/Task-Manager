import styled from 'styled-components';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../features/user/userThunk.js';

const Profile = () => {
    const dispatch = useDispatch();
    const {isLoading, user} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: user.name,
        email: user.email
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(input));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>Profile</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <button type="submit" disabled={isLoading}>{isLoading ? 'UPDATING' : 'UPDATE'}</button>
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
    label, input, button {
        display: block;
    }
    label {
        margin-top: 1rem;
    }
    input {
        margin-bottom: 1rem;
    }
    button, input {
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

export default Profile;