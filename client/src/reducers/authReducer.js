const initialState = {
  user: null,
  error: null
};

const createActions = dispatch => ({
  login: user => dispatch({ type: 'login', payload: { user } }),
  logout: () => dispatch({type : 'logout'}),
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        user: {...action.payload.user},
        error: null
      }
    case 'logout':
      return initialState;
    default:
      return state;
  }
};

export default {
  initialState,
  reducer,
  createActions
};