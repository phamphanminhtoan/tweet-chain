const axios = require("axios");

export const authUser = () => ({
  type: "AUTH_USER"
});

export const authUserSuccess = user => ({
  type: "AUTH_USER_SUCCESS",
  user
});

export const authUserFailure = () => ({
  type: "AUTH_USER_FAILURE"
});

export function authUserFromServer() {
  return async dispatch => {
    await dispatch(authUser());
    await axios({
      method: "get",
      url: "http://tweet-chain-server.glitch.me/getData",
    })
      .then(data => {
        dispatch(authUserSuccess(data.data));
      })
      .catch(err => {
        dispatch(authUserFailure());
      });
  };
}
