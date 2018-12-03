//Init Value of State
const initStateMessage = {
  isAuthenticated: false,
  error: false,
  user: {}
};

const App = (state = initStateMessage, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        isAuthenticated: false,
        error: false
      };
    case "AUTH_USER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        user: action.user
      };
    case "AUTH_USER_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        error: true
      };
    default:
      return state;
  }
};
export default App;
