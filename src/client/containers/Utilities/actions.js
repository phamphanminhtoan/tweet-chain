const axios = require("axios");

export const getMessage = () => ({
  type: "FETCHING_MESSAGE"
});

export const getMessageSuccess = message => ({
  type: "FETCHING_MESSAGE_SUCCESS",
  message
});

export const getMessageFailure = () => ({
  type: "FETCHING_MESSAGE_FAILURE"
});

export function fetchMessage() {
  return async dispatch => {
    await dispatch(getMessage());
    await axios({
      method: "get",
      url: "http://tweet-chain-server.glitch.me/getData",
    })
      .then(data => {
        dispatch(getMessageSuccess(data.data));
      })
      .catch(err => {
        dispatch(getMessageFailure());
      });
  };
}
