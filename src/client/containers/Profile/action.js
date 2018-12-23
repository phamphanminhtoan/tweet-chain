const axios = require("axios");
import { toastr } from "react-redux-toastr";

export const getUser = () => ({
  type: "FETCHING_USER"
});

export const getUserSuccess = user => ({
  type: "FETCHING_USER_SUCCESS",
  user
});

export const getUserFailure = (message) => ({
  type: "FETCHING_USER_FAILURE",
  message
});

export function fetchUser(publicKey = "") {
    return async dispatch => {
      await dispatch(getUser());
      console.log(publicKey);
      await axios({
        method: "get",
        url: "/api/user/get-user/" + publicKey
      })
        .then(data => {
          if(data.data.name === undefined)
          data.data.name = "NoName";
          if(data.data.picture === undefined)
          data.data.picture = "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg";
          toastr.success("TweetChain", "Hello "+ data.data.name);
          dispatch(getUserSuccess(data.data));
        })
        .catch(err => {
          toastr.error(err);
          dispatch(getUserFailure(err));
        });
    };
  }

export const getListPost = () => ({
  type: "FETCHING_LIST_POST"
});

export const getListPostSuccess = listPost => ({
  type: "FETCHING_LIST_POST_SUCCESS",
  listPost
});

export const getListPostFailure = (message) => ({
  type: "FETCHING_LIST_POST_FAILURE",
  message
});

export function fetchListPost(publicKey = "") {
    return async dispatch => {
      await dispatch(getListPost());
      await axios({
        method: "get",
        url: "/api/post/get-list/" + publicKey
      })
        .then(data => {
          console.log(data.data);
          dispatch(getListPostSuccess(data.data));
        })
        .catch(err => {
          toastr.error(err);
          dispatch(getListPostFailure());
        });
    };
  }

export const getListFollowings = () => ({
    type: "FETCHING_LIST_FOLLOWINGS"
  });
  
  export const getListFollowingsSuccess = listFollowings => ({
    type: "FETCHING_LIST_FOLLOWINGS_SUCCESS",
    listFollowings
  });
  
  export const getListFollowingsFailure = (message) => ({
    type: "FETCHING_LIST_FOLLOWINGS_FAILURE",
    message
  });

export function fetchListFollowings(publicKey = "") {
    return async dispatch => {
      await dispatch(getListFollowings());
      await axios({
        method: "get",
        url: "/api/followings/get-list/" + publicKey
      })
        .then(data => {
          dispatch(getListFollowingsSuccess(data.data));
        })
        .catch(err => {
          dispatch(getListFollowingsFailure());
        });
    };
  }
  
