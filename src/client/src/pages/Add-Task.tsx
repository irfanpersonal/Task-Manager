import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, type AppDispatch} from '../store';
import {createTask, editSingleTask} from '../features/task/taskThunk';
import {resetInputValues, updateInputValues} from '../features/task/taskSlice';
import {Loading} from '../components';

const AddTask: React.FunctionComponent = () => {    
    const dispatch = useDispatch<AppDispatch>();
    const {isEditing, createTaskLoading, inputValues, getSingleTaskForEditingLoading, editTaskLoading} = useSelector((store: RootState) => store.task);
    const handleChange = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        dispatch(updateInputValues({name: target.name, value: target.value}));
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isEditing) {
            dispatch(editSingleTask({id: inputValues.id as string, name: inputValues.name, completed: String(inputValues.completed)}));
            return;
        }
        dispatch(createTask({name: inputValues.name}));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{isEditing ? 'Edit Task' : 'Add Task'}</h1>
                {getSingleTaskForEditingLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={inputValues.name} onChange={handleChange} required/>
                        </div>
                        {isEditing && (
                            <div>
                                <label htmlFor="completed">Completed</label>
                                <select id="completed" name="completed" value={String(inputValues.completed)} onChange={handleChange}>
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                            </div>
                        )}
                        {isEditing && (
                            <button onClick={() => dispatch(resetInputValues())} style={{marginBottom: '1rem'}} type="button">CANCEL</button>
                        )}
                        <button type="submit" disabled={createTaskLoading || editTaskLoading}>{createTaskLoading || editTaskLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
                    </>
                )}
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
        width: 50%;
        padding: 20px;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        h1 {
            margin-bottom: 1rem;
            text-align: center;
        }
        div {
            margin-bottom: 1rem;
            label {
                font-size: 16px;
                color: #555;
                margin-bottom: 5px;
                display: block;
            }
            input, select {
                width: 100%;
                padding: 10px;
                font-size: 14px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
        button {
            width: 100%;
            background-color: rgb(134, 167, 137);
            padding: 10px 15px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: rgb(227, 247, 207);
                outline: 1px solid black;
            }
        }
    }
`;

export default AddTask;