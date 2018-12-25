const axios = require("axios");
import { toastr } from "react-redux-toastr";

export const getUser = () => ({
  type: "FETCHING_USER"
});

export const getUserSuccess = user => ({
  type: "FETCHING_USER_SUCCESS",
  user
});

export const getUserFailure = message => ({
  type: "FETCHING_USER_FAILURE",
  message
});

export function fetchUser(publicKey = "") {
  return async dispatch => {
    await dispatch(getUser());
    await axios({
      method: "get",
      url: "/api/user/get-user/" + publicKey
    })
      .then(data => {
        if (data.data.name === undefined) data.data.name = "NoName";
        if (data.data.picture === undefined)
          data.data.picture =
            "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg";
        dispatch(getUserSuccess(data.data));
      })
      .catch(err => {
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

export const getListPostFailure = message => ({
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

export const getListFollowingsFailure = message => ({
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
        console.log(data.data);
        dispatch(getListFollowingsSuccess(data.data));
      })
      .catch(err => {
        dispatch(getListFollowingsFailure());
      });
  };
}

export const getNotification = () => ({
  type: "FETCHING_LIST_NOTIFICATION"
});

export const getNotificationSuccess = notification => ({
  type: "FETCHING_LIST_NOTIFICATION_SUCCESS",
  notification
});

export const getNotificationFailure = message => ({
  type: "FETCHING_LIST_NOTIFICATION_FAILURE",
  message
});

export function fetchNotification(publicKey = "") {
  return async dispatch => {
    await dispatch(getNotification());
    await axios({
      method: "get",
      url: "/api/notification/get-list/" + publicKey
    })
      .then(data => {
        dispatch(getNotificationSuccess(data.data));
      })
      .catch(err => {
        dispatch(getNotificationFailure());
      });
  };
}

export const getPayment = () => ({
  type: "FETCHING_PAYMENT"
});

export const getPaymentSuccess = payment => ({
  type: "FETCHING_PAYMENT_SUCCESS",
  payment
});

export const getPaymentFailure = (message) => ({
  type: "FETCHING_PAYMENT_FAILURE",
  message
});

export function fetchPayment(publicKey = "") {
    return async dispatch => {
      await dispatch(getPayment());
      await axios({
        method: "get",
        url: "/api/transaction/get-list/" + publicKey
      })
        .then(data => {
          dispatch(getPaymentSuccess(data.data));
        })
        .catch(err => {
          dispatch(getPaymentFailure(err));
        });
    };
}

/* export const getInteract = () => ({
  type: "FETCHING_PAYMENT"
});

export const getInteractSuccess = Interact => ({
  type: "FETCHING_PAYMENT_SUCCESS",
  payment
});

export const getInteractFailure = (message) => ({
  type: "FETCHING_PAYMENT_FAILURE",
  message
});

export function fetchInteract(publicKey = "") {
    return async dispatch => {
      await dispatch(getInteract());
      await axios({
        method: "get",
        url: "/api/interact/get-list/" + publicKey
      })
        .then(data => {
          dispatch(getInteractSuccess(data.data));
        })
        .catch(err => {
          toastr.error(err);
          dispatch(getInteractFailure(err));
        });
    };
} */