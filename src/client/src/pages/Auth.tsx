import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, AppDispatch} from '../store'; // We set the import as "type" so we can tell the bunder to exclude this as its of no use to it. Its just a type for us to use to make TypeScript happy
import {toggleAuthType} from '../features/user/userSlice';
import {loginUser, registerUser} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';
import {type IInput} from '../features/user/userThunk';

const Auth: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {wantsToRegister, user, authLoading} = useSelector((store: RootState) => store.user);
    const [input, setInput] = React.useState<IInput>({
        name: '',
        email: '',
        password: ''
    });
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser(input));
    }
    const handleChange = (event: React.FormEvent) => {
        setInput(currentState => {
            const target = event.target as HTMLInputElement;
            return {...currentState, [target.name]: target.value};
        });
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToRegister ? 'Register' : 'Login'}</h1>
                {wantsToRegister && (
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
                <p>{wantsToRegister ? 'Have an account?' : `Don't have an account?`}<span onClick={() => dispatch(toggleAuthType())}>{wantsToRegister ? 'Login' : 'Register'}</span></p>
                <button type="submit" disabled={authLoading}>{authLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    form {
        width: 50%;
        padding: 2rem;
        background-color: white;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        text-align: center;
        div {
            margin-bottom: 1rem;
            label { // When I put an input inside of my "div" selector that means: any lablel that is a child of the div should be styled this way
                display: block;
                text-align: left;
                margin-bottom: 0.5rem;
                color: black;
            }
            input { // Any input that is a child of a div do this styling
                outline: none;
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            input:focus {
                outline: 1px solid black;
            }
        }
        p {
            color: black;
            span {
                margin-left: 1rem;
                padding: 0 1.5rem;
                border-radius: 1rem;
                border: 1px solid black;
                cursor: pointer;
                background-color: lightgray;
            }
            span:active {
                background-color: black;
                color: white;
                user-select: none;
            }
        }
        button {
            background-color: white;
            border: 1px solid black;
            color: black;
            /*  */
            padding: 0.5rem;
            width: 100%;
            margin-top: 1rem;
        }
        button:active {
            background-color: black;
            color: white;
            outline: 1px solid black;
        }
    }
`;

export default Auth;