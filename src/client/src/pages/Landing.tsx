import styled from 'styled-components';
import addNote from '../images/add_notes.png';
import {Link} from 'react-router-dom';
import {BsSpeedometer2} from 'react-icons/bs';
import {PiVaultBold} from 'react-icons/pi';
import {GrStatusGood} from 'react-icons/gr';

const Landing = () => {
    return (
        <Wrapper>
            <h1>Task Manager</h1>
            <p>Your ultimate destination for effortlessly managing all your tasks. So why wait any longer? Dive right in!</p>
            <img src={addNote} alt="An individual looking at notes"/>
            <br></br>
            <Link to='/auth'>Register/Login</Link>
            <div className="container">
                <h2>Fast</h2>
                <h2>{<BsSpeedometer2/>}</h2>
            </div>
            <div className="container">
                <h2>Secure</h2>
                <h2>{<PiVaultBold/>}</h2>
            </div>
            <div className="container">
                <h2>Reliable</h2>
                <h2>{<GrStatusGood/>}</h2>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    width: 50%;
    margin: 0 auto;
    text-align: center;
    h1 {
        background-color: rgb(170, 200, 167);
        border: 1px solid black;
    }
    a {
        text-decoration: none;
        display: inline-block;
        background-color: white;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        color: black;
    }
    a:hover {
        background-color: black;
        color: white;
    }
    img {
        width: 50%;
        height: 50%;
    }
    h1, p, a, img {
        margin-top: 1rem;
    }
    .container {
        border: 1px solid black;
        margin: 1rem 0;
        background-color: rgb(246, 255, 222);
    }
`;

export default Landing;