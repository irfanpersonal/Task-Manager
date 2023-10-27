import styled from 'styled-components';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {registerUser, loginUser} from '../features/user/userThunk.js';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, user} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        password: '',
        wantsToRegister: true
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const toggleAuthType = () => {
        setInput(currentState => {
            return {...currentState, wantsToRegister: !input.wantsToRegister};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser({email: input.email, password: input.password}));
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{input.wantsToRegister ? 'Register' : 'Login'}</h1>
                {input.wantsToRegister && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={input.password} onChange={handleChange}/>
                </div>
                <p>{input.wantsToRegister ? `Have an account?` : `Don't have an account?`} <span onClick={toggleAuthType}>{input.wantsToRegister ? 'Login' : 'Register'}</span></p>
                <button type="submit" disabled={isLoading}>{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    form {
        border: 1px solid black;
        padding: 1rem;
        width: 50%;
        background-color: white;
        border-radius: 0.5rem;
    }
    h1 {
        text-align: center;
        background-color: rgb(170, 200, 167);
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

export default Auth;