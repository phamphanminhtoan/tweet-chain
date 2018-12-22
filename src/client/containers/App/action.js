const axios = require("axios");
const { Keypair } = require("stellar-base");

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

export function handleAuthUser(user) {
  console.log('hello');
  return async dispatch => {
    await dispatch(authUser());
    let publicKey = Keypair.fromSecret(user.privateKey).publicKey();
    if (publicKey === user.publicKey) dispatch(authUserSuccess(user));
    else dispatch(authUserFailure());
  };
}
