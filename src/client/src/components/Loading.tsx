import styled from 'styled-components';

const Loading: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <h1 className="loading"></h1>
            <h1 style={{marginTop: '1rem'}}>Loading</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    .loading {
        border: 0.5rem solid white;
        border-top: 0.5rem solid blue; 
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        animation: spin 1s linear infinite; 
    }
    @keyframes spin {
        0% { 
            transform: rotate(0deg); 
        }
        100% { 
            transform: rotate(360deg); 
        }
    }
`;

export default Loading;