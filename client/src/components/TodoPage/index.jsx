import React, { useContext } from 'react';
import styled from 'styled-components';
import { TextInput } from '../Input';
import ToDoRawBase from '../TodoRow';
import { ThemeContext, AuthContext } from '../../contexts';
import useTodoState from '../../hooks/useTodoState';

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
    padding : 1rem;
    font-size : 1.5rem;
`;

const TodoRow = styled(ToDoRawBase)`
    margin-bottom : 1rem;
`;

const TodoPage = () => {
    const theme = useContext(ThemeContext);
    const { userState } = useContext(AuthContext);
    const [todoState, inputState] = useTodoState(userState.user);
    return (
        <Wrapper theme={theme}>
            <Title>Add Todo</Title>
            <Body>
                <TodoInput
                    value={inputState.value}
                    onChange={(e) => {
                        inputState.set(e.target.value);
                    }}
                    onEnter={() => {
                        todoState.add(inputState.value);
                        inputState.set('');
                    }}
                    label='INPUT TODO'
                />
                <TodoListPanel>
                    {todoState.values.map(todo => {
                        return (
                            <TodoRow
                                key={todo.id}
                                iconsize='1.5rem'
                                todo={todo}
                                onChange={todoState.modify}
                                onDelete={() => {
                                    todoState.delete(todo);
                                }} />
                        )
                    })}
                </TodoListPanel>
            </Body>
        </Wrapper>
    )
}

export default TodoPage;