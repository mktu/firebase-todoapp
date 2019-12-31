import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import TextInput from '../Input';
import ToDoRawBase from '../TodoRow';
import TodoDetail from '../TodoDetail';
import {List} from '../List';
import { ThemeContext } from '../../contexts';
import Paper from '../Paper';
import TodoMenuItemsBase from '../TodoMenuItems';
import useTodoState from '../../hooks/useTodoState';

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items:center;
`;

const Title = styled.h3`
    text-align : center;
    margin-bottom : 1rem;
`;

const TodoMenuItems = styled(TodoMenuItemsBase)`
    font-size : 1.2rem;
    padding : 0.9rem;
`;

const Body = styled.div`
    display : flex;
    justify-content: start;
    padding : 1rem;
`;

const TodoInput = styled(TextInput)`
    width : 400px;
    & > input, & > label {
        font-size : 1.5rem;
    }
`;

const TodoListPanel = styled(Paper)(({ theme }) => `
    background-color: ${theme.surface};
    font-size : 1.2rem;
`);

const ToDoList = styled(List)`
    overflow : scroll;
    height : 55vh;
`;

const TodoRow = styled(ToDoRawBase)`
    padding : 1rem;
`;

const TodoPage = () => {
    const theme = useContext(ThemeContext);
    const { newItemState, todoState, todos, selected, sorter, handleSort, handleSortByDate } = useTodoState();
    return (
        <Wrapper theme={theme}>
            <Body>
                <TodoListPanel theme={theme}>
                    <Title>Add Todo</Title>
                    <TodoInput
                        value={newItemState.current}
                        onChange={newItemState.handleChange}
                        onEnter={newItemState.handleSubmit}
                        label='Input Todo'
                    />
                    <TodoMenuItems handleSort={handleSortByDate}/>
                    <ToDoList items={todos} onSort={handleSort} sorter={sorter}>
                    {
                        useMemo(()=>{
                            return (todo)=>(
                                <TodoRow
                                    iconsize='1rem'
                                    todo={todo}
                                    handleJump={todoState.handleJump}
                                    onChange={todoState.handleChange}
                                    onDelete={todoState.handleDelete} />
                            )
                        },[todoState])
                    }
                    </ToDoList>
                </TodoListPanel>
                <TodoDetail todo={selected} onChange={todoState.handleChange} />

            </Body>
        </Wrapper>
    )
}

export default TodoPage;