import styled from 'styled-components';
import {AiOutlineCheckCircle, AiOutlineStop} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {showStats} from '../features/tasks/tasksThunk.js';

const Stats = () => {
    const dispatch = useDispatch();
    const {isLoading, statValues} = useSelector(store => store.tasks);
    React.useEffect(() => {
        dispatch(showStats());
    }, []);
    if (isLoading) {
        return (
            <h1 style={{backgroundColor: 'black', color: 'white', textAlign: 'center'}}>Loading...</h1>
        );
    }
    return (
        <Wrapper>
            <h1>Stats</h1>
            <div className="container" style={{border: '10px solid rgb(134, 167, 137)'}}>
                <div>Completed</div>
                <div>{statValues.completedTrue}</div>
                <div><AiOutlineCheckCircle/></div>
            </div>
            <div className="container" style={{border: '10px solid rgb(255, 155, 155)'}}>
                <div>Not Completed</div>
                <div>{statValues.completedFalse}</div>
                <div><AiOutlineStop/></div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    h1 {
        text-align: center;
        background-color: black;
        color: white;
    }
    .container {
        text-align: center;
        background-color: lightgray;
        margin-top: 1rem;
    }
    div {
        font-size: 1rem;
        margin: 1rem 0;
        padding: 0.25rem 0;
    }
`;

export default Stats;