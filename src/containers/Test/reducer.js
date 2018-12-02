//Init Value of State
const initStateMessage = {
    name: 'test',
    nickname: 'test'
};

const messages = (state = initStateMessage, action) => {
  switch (action.type) {
    case "FETCH_MESSAGE":
      return {
          ...state,
          name: action.message.name,
          nickname: action.message.nickname,
      }
    default:
      return state;
  }
};
export default messages;
