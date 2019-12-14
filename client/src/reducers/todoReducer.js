const initialState = [];

const createActions = dispatch => ({
    init : () => dispatch({type:'init'}),
    added: todo => dispatch({ type: 'added', payload: { todo } }),
    removed: todo => dispatch({ type: 'removed', payload: { todo } }),
    modified: todo => dispatch({ type: 'modified', payload: { todo } }),
  });

const reducer = (state, action) => {
    switch (action.type) {
        case 'init' : 
            return [...initialState];
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
    reducer,
    createActions
};