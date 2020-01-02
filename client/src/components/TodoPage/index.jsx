import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextInput from '../Input';
import ToDoRawBase from '../TodoRow';
import TodoDetail from '../TodoDetail';
import { List } from '../List';
import { ThemeContext } from '../../contexts';
import Paper from '../Paper';
import TodoMenuItemsBase from '../TodoMenuItems';
import { ErrorModal } from '../Modal';
import useTodoState from '../../hooks/useTodoState';

const Wrapper = styled.div` 
    display : flex;
    flex-direction : column;
    align-items:center;
`; // for centerize

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
    margin-top : 1rem;
    & > input, & > label {
        font-size : 1.5rem;
    }
`;

const TodoListPanel = styled(Paper)(({ theme }) => `
    background-color: ${theme.surface};
    font-size : 1.2rem;
`);

const ToDoList = styled(List)(({ theme }) => `
    overflow : scroll;
    height : 60vh;
    border-bottom : 1px solid ${theme.divider};
`);

const TodoRow = styled(ToDoRawBase)`
    padding : 1rem;
`;

const TodoPage = () => {
    const theme = useContext(ThemeContext);
    const { t } = useTranslation();
    const {
        newItemState,
        todoState,
        todos,
        selected,
        sorter,
        handleSort,
        handleSortByDate,
        deleteCompletedList,
        hasError,
        error,
        refresh
    } = useTodoState();
    return (
        <Wrapper>
            <Body>
                <TodoListPanel theme={theme}>
                    <TodoInput
                        value={newItemState.current}
                        onChange={newItemState.handleChange}
                        onEnter={newItemState.handleSubmit}
                        label={t('InputTodo')}
                    />
                    <ToDoList items={todos} onSort={handleSort} sorter={sorter} theme={theme}>
                        {
                            useMemo(() => {
                                return (todo) => (
                                    <TodoRow
                                        iconsize='1rem'
                                        todo={todo}
                                        handleJump={todoState.handleJump}
                                        onChange={todoState.handleChange}
                                        onDelete={todoState.handleDelete} />
                                )
                            }, [todoState])
                        }
                    </ToDoList>
                    <TodoMenuItems handleSort={handleSortByDate} deleteCompletedList={deleteCompletedList} />
                </TodoListPanel>
                <TodoDetail todo={selected} onChange={todoState.handleChange} />
            </Body>
            <ErrorModal
                isOpen={hasError}
                mainMessage={'ERROR!'}
                error={error}
                onClose={refresh}
                onBackgroundClick={refresh}
            />
        </Wrapper>
    )
}

export default TodoPage;