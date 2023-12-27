// actions/authActions.js

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const updateUser = (updatedUser) => ({
  type: "UPDATE_USER",
  payload: updatedUser,
});

export const logout = () => ({
  type: "LOGOUT",
});
