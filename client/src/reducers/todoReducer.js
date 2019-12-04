const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'added':
            return [...state, action.payload.todo];
        case 'removed':
            return [...state.filter(todo => todo.id !== action.payload.todo.id)];
        case 'modified':
            return [...state.map(todo => todo.id === action.payload.todo.id ? action.payload.todo : todo)];
        default:
            return state;
    }
};

export default {
    initialState,
    reducer
};