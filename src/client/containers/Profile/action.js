const axios = require("axios");

export const getListPost = () => ({
  type: "FETCHING_LIST_POST"
});

export const getListPostSuccess = listPost => ({
  type: "FETCHING_LIST_POST_SUCCESS",
  listPost
});

export const getListPostFailure = () => ({
  type: "FETCHING_LIST_POST_FAILURE"
});

export function fetchListPost(publicKey = "") {
    return async dispatch => {
      await dispatch(getListPost());
      await axios({
        method: "get",
        url: "/api/post/get-list-post/" + publicKey
      })
        .then(data => {
          dispatch(getListPostSuccess(data.data));
        })
        .catch(err => {
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
  
  export const getListFollowingsFailure = () => ({
    type: "FETCHING_LIST_FOLLOWINGS_FAILURE"
  });

export function fetchListFollowings(publicKey = "") {
    return async dispatch => {
      await dispatch(getListFollowings());
      await axios({
        method: "get",
        url: "/api/post/get-list-post/" + publicKey
      })
        .then(data => {
          dispatch(getListFollowingsSuccess(data.data));
        })
        .catch(err => {
          dispatch(getListFollowingsFailure());
        });
    };
  }
  
