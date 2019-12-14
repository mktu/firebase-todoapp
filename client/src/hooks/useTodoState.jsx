import { useState, useEffect, useReducer, useRef } from 'react';
import { db } from '../services';
import { todoReducer } from '../reducers';

export default function (user) {
    const [todos, dispatch] = useReducer(todoReducer.reducer, todoReducer.initialState);
    const [inputTodo, setInputTodo] = useState('');
    const unsubscribe = useRef(() => { });
    useEffect(() => {
        unsubscribe.current();
        setInputTodo('');
        const actions = todoReducer.createActions(dispatch);
        actions.init();
        if (user) {
            unsubscribe.current = db.registListener(
                actions.added,
                actions.modified,
                actions.removed,
                user);
        }
    }, [user]);
    return [{
        values: todos,
        add: (todo) => {
            db.addTodo(todo, user);
        },
        modify: db.modifyTodo,
        delete: db.deleteTodo
    }, {
        value: inputTodo,
        set: setInputTodo
    }];
}