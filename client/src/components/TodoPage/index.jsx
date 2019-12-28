import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import TextInput from '../Input';
import ToDoRawBase from '../TodoRow';
import TodoDetail from '../TodoDetail';
import {List} from '../List';
import { ThemeContext } from '../../contexts';
import Paper from '../Paper';
import useTodoState from '../../hooks/useTodoState';

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items:center;
`;

const Title = styled.h3`
    text-align : center;
    margin-bottom : 2rem;
`;
const Body = styled.div`
    display : flex;
    justify-content: start;
    padding : 2rem;
`;

const TodoInput = styled(TextInput)`
    width : 400px;
    & > #input, & > #label {
        font-size : 1.5rem;
    }
`;

const TodoListPanel = styled(Paper)(({ theme }) => `
    background-color: ${theme.surface};
    font-size : 1.5rem;
`);

const ToDoList = styled(List)`
`;

const TodoRow = styled(ToDoRawBase)`
    padding : 1rem;
`;

const TodoPage = () => {
    const theme = useContext(ThemeContext);
    const { newItemState, todoListState, selected } = useTodoState();
    return (
        <Wrapper theme={theme}>
            <Body>
                <TodoListPanel theme={theme}>
                    <Title>Add Todo</Title>
                    <TodoInput
                        value={newItemState.current}
                        onChange={newItemState.handleChange}
                        onEnter={newItemState.handleSubmit}
                        label='INPUT TODO'
                    />
                    <ToDoList items={todoListState.todos}>
                    {
                        (todo,listProps)=>(
                            <TodoRow
                                key={todo.id}
                                iconsize='1rem'
                                todo={todo}
                                listProps={listProps}
                                handleJump={todoListState.handleJump}
                                onChange={todoListState.handleChange}
                                onDelete={todoListState.handleDelete} />
                        )
                    }
                    </ToDoList>
                </TodoListPanel>
                <TodoDetail todo={selected} onChange={todoListState.handleChange} />

            </Body>
        </Wrapper>
    )
}

export default TodoPage;