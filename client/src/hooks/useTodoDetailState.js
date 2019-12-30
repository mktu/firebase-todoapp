import { useState, useEffect } from 'react';

export default function ({todo,onChange}) {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    useEffect(() => {
        if (todo) {
            const { name = '', detail = '' } = todo;
            setTitle(name);
            setDetail(detail);
        }
    }, [todo])
    const handleTitleInputChange = e => {
        setTitle(e.target.value);
    }
    const handleTitleInputBlur = () => {
        todo.name !== title &&
            onChange({
                ...todo,
                name: title
            })
    }
    const handleDetailInputChange = e => {
        setDetail(e.target.value)
    }
    const handleDetailInputBlur = () => {
        todo.detail !== detail &&
            onChange({
                ...todo,
                detail: detail
            })
    }
    let dueDate = null;
    if (todo && todo.dueDate) {
        dueDate = new Date(todo.dueDate);
    }
    const handleChangeDueDate = (date) => {
        onChange({
            ...todo,
            dueDate: date ? date.toUTCString() : null
        });
    }
    return {
        title,
        handleTitleInputChange,
        handleTitleInputBlur,
        detail,
        handleDetailInputChange,
        handleDetailInputBlur,
        dueDate,
        handleChangeDueDate
    }
}