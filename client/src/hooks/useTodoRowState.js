export default function ({todo,handleJump,onChange,onDelete}) {
    const checked = Boolean(todo.checked);
    let isPastDueDate = false;
    let dueDateStr = null;
    if(todo.dueDate){
        const now = new Date();
        const dueDate = new Date(todo.dueDate);
        isPastDueDate = now>dueDate;
        dueDateStr = dueDate.toLocaleString();
    }
    const handleClickItem = () => {
        handleJump(todo);
    }
    const handleCheck = e => {
        onChange({
            ...todo,
            checked: !checked,
        });
    }
    const handleDelete = e => {
        e.stopPropagation();
        onDelete(todo);
    }
    return {
        checked,
        handleCheck,
        handleClickItem,
        handleDelete,
        isPastDueDate,
        dueDateStr
    }
}