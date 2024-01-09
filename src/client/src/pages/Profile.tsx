import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../store';
import {type AppDispatch} from '../store';
import {deleteAccount, logoutUser, updateUser, updateUserPassword} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';
import {Modal} from '../components';

interface IInput {
    name: string,
    email: string,
    oldPassword: string,
    newPassword: string
}

const Profile: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {user, signOutLoading, updateUserLoading} = useSelector((store: RootState) => store.user);
    const [isChangingPassword, setIsChangingPassword] = React.useState<boolean>(false);
    const [input, setInput] = React.useState<IInput>({
        name: user?.name as string,
        email: user?.email as string,
        oldPassword: '',
        newPassword: ''
    });
    const [modal, setModal] = React.useState<boolean>(false);
    const showModal = () => {
        setModal(currentState => {
            return true;
        });
    }
    const closeModal = () => {
        setModal(currentState => {
            return false;
        });
    }
    const handleChange = (event: React.FormEvent) => {
        setInput(currentState => {
            const target = event.target as HTMLInputElement;
            return {...currentState, [target.name]: target.value};
        });
    } 
    const toggle = () => {
        setIsChangingPassword(currentState => {
            return !currentState;
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isChangingPassword) {
            dispatch(updateUserPassword({oldPassword: input.oldPassword, newPassword: input.newPassword}));
            return;
        }
        dispatch(updateUser({name: input.name, email: input.email}));
    }
    const handleModalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const passwordValue = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
        dispatch(deleteAccount({password: passwordValue}));
    }
    React.useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);
    return (
        <>
            <Wrapper>
                <h1>Welcome back, {user!.name}</h1>
                <form onSubmit={handleSubmit}>
                    {isChangingPassword ? (
                        <>
                            <div>
                                <label htmlFor="oldPassword">Old Password</label>
                                <input id="oldPassword" type="password" name="oldPassword" value={input.oldPassword} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="newPassword">New Password</label>
                                <input id="newPassword" type="password" name="newPassword" value={input.newPassword} onChange={handleChange} required/>
                            </div>
                        </>
                    ) : (
                        <>
                           <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" name="name" value={input.name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input id="email" type="email" name="email" value={input.email} onChange={handleChange} required/>
                            </div> 
                        </>
                    )}
                    <p onClick={toggle}>{isChangingPassword ? `Don't want to change password?` : 'Want to change password?'}</p>
                    <button type="submit" disabled={updateUserLoading}>{updateUserLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
                </form>
            </Wrapper>
            <p onClick={showModal} style={{marginTop: '1rem', textAlign: 'center', cursor: 'pointer'}}>Delete Account</p>
            {modal && <Modal title="Delete Account" description="Are you certain you wish to proceed with deleting your account? Please note that this action is irreversible." closeModal={closeModal} handleSubmit={handleModalSubmit}/>}
            <button style={{marginTop: '1rem', width: '100%', padding: '0.5rem', backgroundColor: 'lightcoral', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'}} disabled={signOutLoading} onClick={() => dispatch(logoutUser())}>{signOutLoading ? 'Logging Out...' : 'Log Out'}</button>
        </>
    );
}

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    h1 {
        border-bottom: 1px solid black;
        margin-bottom: 1rem;
    }
    form {
        display: flex;
        flex-direction: column;
        div {
            margin-bottom: 1rem;
            label {
                margin-bottom: 1rem;
            }
            input {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid gray;
                border-radius: 0.25rem;
            }
        }
        button {
            background-color: rgb(82, 92, 235);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            &:hover {
                background-color: rgb(123, 211, 234);
            }
        }
    }
    p {
        cursor: pointer;
        margin-bottom: 1rem;
        text-align: center;
    }
    p:hover, p:active {
        color: gray;
    }
`;

export default Profile;