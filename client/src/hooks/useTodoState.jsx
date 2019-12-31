import { useState, useContext, useEffect, useReducer, useMemo, useCallback } from 'react';
import { useParams,useHistory } from "react-router-dom";
import { db } from '../services';
import { AuthContext } from '../contexts';
import { todoReducer } from '../reducers';

const handleSort = (sortedTodos) =>{
    db.updateTodos(sortedTodos.map((todo,idx)=>({
        ...todo,
        index : idx
    })))
}

const sorter = (i1, i2) => {
    if (i1.index !== undefined && i2.index !== undefined) {
        return i1.index - i2.index;
    }
    return i1.name - i2.name;
}

export default function () {
    const { userState } = useContext(AuthContext);
    const { user } = userState;
    const { todoId } = useParams();
    let history = useHistory();
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
            if(inputTodo!==''){
                setInputTodo('');
                db.addTodo(inputTodo, user);
            }
        },
        current: inputTodo
    };
    const todoState = useMemo(()=>{
        return {
            handleChange: (todo) => {
                db.modifyTodo(todo);
            },
            handleDelete: (todo) => {
                db.deleteTodo(todo);
            },
            handleJump: (todo) =>{
                history.push(todo.id);
            },
        };
    },[history])

    const handleSortByDate = ()=>{
        const listWithDueDate = todos.filter(todo=>Boolean(todo.dueDate));
        const listWithoutDueDate = todos.filter(todo=>!Boolean(todo.dueDate));
        const sorted = listWithDueDate.sort((i1,i2)=>{
            const i1date = new Date(i1.dueDate);
            const i2Date = new Date(i2.dueDate);
            return i1date - i2Date;
        });
        const newList = [...sorted,...listWithoutDueDate];
        db.updateTodos(newList.map((todo,i)=>({
            ...todo,
            index : i
        })));
    }

    const deleteCompletedList = () =>{
        db.deleteTodos(todos.filter(todo=>todo.checked));
    }

    const selected = todos.find(todo=>todo.id===todoId);
    return { 
        newItemState, 
        todoState, 
        todos, 
        handleSort, 
        sorter, 
        selected, 
        handleSortByDate, 
        deleteCompletedList 
    };
}