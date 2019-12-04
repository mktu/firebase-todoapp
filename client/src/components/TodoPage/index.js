import React, { useState, useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { db } from '../../services';
import { TextInput } from '../Input';
import { todoReducer } from '../../reducers';
import { ThemeContext, AuthContext } from '../../contexts';

const Wrapper = styled.div(({ theme }) => `
    background-color: ${theme.bgcolor};
    display : flex;
    flex-direction : column;
    align-items:center;
`);

const Title = styled.h2`
    text-align : center;
    margin-bottom : 2rem;
`;
const Body = styled.div`

`;

const TodoInput = styled(TextInput)`
    width : 400px;
    & > #input, & > #label {
        font-size : 2rem;
    }
`;

const TodoListPanel = styled.div`

`;

const TodoPage = ({ ...props }) => {
    const theme = useContext(ThemeContext);
    const user = useContext(AuthContext);
    const [todos, dispatch] = useReducer(todoReducer.reducer, todoReducer.initialState);
    const [inputTodo, setInputTodo] = useState('');
    useEffect(() => {
        if(user && user.uid){
            db.registListener(dispatch, user);
        }
    },[user]);
    return (
        <Wrapper theme={theme}>
            <Title>Add Todo</Title>
            <Body>
                <TodoInput
                    value={inputTodo}
                    onChange={(e) => {
                        setInputTodo(e.target.value);
                    }}
                    onEnter={() => {
                        db.addTodo(inputTodo, user);
                        setInputTodo('');
                    }}
                    label='INPUT TODO'
                />
                <TodoListPanel>
                    {todos.map(todo => {
                        return (
                            <div key={todo.id}>{todo.name}</div>
                        )
                    })}
                </TodoListPanel>
            </Body>
        </Wrapper>
    )
}

export default TodoPage;