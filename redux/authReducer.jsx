// reducer.js

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
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
