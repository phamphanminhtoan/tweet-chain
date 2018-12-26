const axios = require("axios");
const { Keypair } = require("stellar-base");
import { toastr } from "react-redux-toastr";

export const authUser = () => ({
  type: "AUTH_USER"
});

export const authUserSuccess = user => ({
  type: "AUTH_USER_SUCCESS",
  user
});

export const authUserFailure = (message) => ({
  type: "AUTH_USER_FAILURE",
  message: message
});

export function handleAuthUser(userInput) {
  return async dispatch => {
    await dispatch(authUser());
    let publicKey = Keypair.fromSecret(userInput.privateKey).publicKey();
    if (publicKey === userInput.publicKey) {
      axios.get('/api/user/get-user/' + publicKey).then(user=>{
        dispatch(authUserSuccess(user.data));
        if(user.data.name === undefined)
        user.data.name = "NoName";
        if(user.data.picture === undefined)
        user.data.picture = "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg";
        user.data.privateKey = userInput.privateKey;
        window.localStorage.setItem('User', JSON.stringify(user.data));
        toastr.success("TweetChain", "Login Successful");
       window.location.href = "/";
      }).catch(err=>{
        dispatch(authUserFailure(err.message));
      });
    }
    else dispatch(authUserFailure());
  };
}
