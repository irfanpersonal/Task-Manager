import {useRouteError, Link} from 'react-router-dom';
import styled from 'styled-components';

interface IError {
    status: number
}

const Error: React.FunctionComponent = () => {
    const error = useRouteError() as IError;
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies! It seems like you're a bit lost. How about heading home?</p>
                <Link to='/'>Back Home</Link>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h1>Something went wrong, try again later!</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    h1, p, a {
        margin-bottom: 1rem;
    }
    a {
        background-color: lightcoral;
        padding: 0.5rem 1rem;
        border: 1px solid black;
        border-radius: 1rem;
        text-decoration: none;
        color: black;
    }
`;

export default Error;