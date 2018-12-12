//Init Value of State
const initStateMessage = {
  content: "",
  isFetching: false,
  error: false,
};

const messages = (state = initStateMessage, action) => {
  switch (action.type) {
    case "FETCHING_MESSAGE":
      return {
        ...state,
        content: "",
        isFetching: true,
        error: false
      };
    case "FETCHING_MESSAGE_SUCCESS":
      return {
        ...state,
        content: action.message.content,
        isFetching: false,
        error: false
      };
    case "FETCHING_MESSAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};
export default messages;
