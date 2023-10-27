import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {isEditingFalse, resetEditTaskValues, updateEditTaskValues} from '../features/tasks/tasksSlice.js';
import {createTask, updateSingleTask} from '../features/tasks/tasksThunk.js';
import React from 'react';

const AddTask = () => {
    const dispatch = useDispatch();
    const {isEditing, editTaskValues, isLoading} = useSelector(store => store.tasks);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            dispatch(updateSingleTask({taskID: editTaskValues.id, task: editTaskValues}));
            return;
        }
        dispatch(createTask({name: editTaskValues.name}));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{isEditing ? 'Edit Task' : 'Add Task'}</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={editTaskValues.name} onChange={(event) => dispatch(updateEditTaskValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                {isEditing && (
                    <div>
                        <label htmlFor="completed">Completed</label>
                        <select id="completed" name="completed" value={editTaskValues.completed} onChange={(event) => dispatch(updateEditTaskValues({name: event.target.name, value: event.target.value}))}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                )}
                {isEditing && (
                    <button type="button" onClick={() => {
                        dispatch(resetEditTaskValues());
                        dispatch(isEditingFalse());
                    }}>CLEAR</button>
                )}
                <button type="submit" disabled={isLoading}>{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
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
    button, input, select {
        width: 100%;
        padding: 0.5rem;
        margin-top: 1rem;
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

export default AddTask;