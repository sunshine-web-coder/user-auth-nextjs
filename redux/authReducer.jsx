// reducer.js

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      // Handle logout and clear user and tokens
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
