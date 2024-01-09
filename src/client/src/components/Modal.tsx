import styled from 'styled-components';
import {FaWindowClose} from "react-icons/fa";
import {useSelector} from 'react-redux';
import {RootState} from '../store';

interface ModalProps {
    title: string,
    description: string,
    closeModal: () => void,
    handleSubmit: (event: React.FormEvent) => void
}

const Modal: React.FunctionComponent<ModalProps> = ({title, description, closeModal, handleSubmit}) => {
    const {deleteAccountLoading} = useSelector((store: RootState) => store.user);
    return (
        <Wrapper>
            <div className="header">
                <h1>{title}</h1>
                <div><FaWindowClose style={{cursor: 'pointer', fontSize: '1.5rem'}} onClick={closeModal}/></div>
            </div>
            <p>{description}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Please enter your password</label>
                    <input id="password" type="password"/>
                </div>
                <button type="submit" disabled={deleteAccountLoading}>{deleteAccountLoading ? 'DELETING' : 'DELETE'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid black;
    }
    p {
        margin: 1rem 0;
    }
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    outline: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
    input {
        width: 100%;
        padding: 0.5rem;
    }
    button {
        margin-top: 1rem;
        width: 100%;
        padding: 0.5rem;
        border: none;
        background-color: lightcoral;
    }
`;

export default Modal;