const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: {}
};

function authReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}

export default authReducer;
