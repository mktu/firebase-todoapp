import { useState, useContext, useEffect, useReducer } from 'react';
import { db } from '../services';
import { AuthContext } from '../contexts';
import { todoReducer } from '../reducers';

export default function () {
    const { userState } = useContext(AuthContext);
    const { user } = userState;
    const [todos, dispatch] = useReducer(todoReducer.reducer, todoReducer.initialState);
    const [inputTodo, setInputTodo] = useState('');
    useEffect(() => {
        const actions = todoReducer.createActions(dispatch);
        actions.init();
        let unsubscribe = null;
        if (user) {
            unsubscribe = db.registListener(
                actions.added,
                actions.modified,
                actions.removed,
                user);
        }
        return ()=>{
            unsubscribe && unsubscribe();
        }
    }, [user]);

    const newItemState = {
        handleChange: (e) => {
            setInputTodo(e.target.value);
        },
        handleSubmit: () => {
            setInputTodo('');
            db.addTodo(inputTodo, user);
        },
        current: inputTodo
    };
    const todoListState = {
        handleChange: (todo) => {
            db.modifyTodo(todo);
        },
        handleDelete: (todo) => {
            db.deleteTodo(todo);
        },
        todos
    }

    return { newItemState, todoListState }
}