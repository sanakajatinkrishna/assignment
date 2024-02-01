// reducers.js
const initialState = {
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: { username: action.payload.username } };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default appReducer;
