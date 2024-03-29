//Init Value of State
const initStateUser = {
  user: {},
  isFetching: false,
  error: false,
  message: ''
};

const initStateListPost = {
  listPost: [],
  isFetching: false,
  error: false,
  message: ''
};

const initStateListFollowings = {
    listFollowings: [],
    isFetching: false,
    error: false,
    message: ''
};

const initStateListNotification = {
  listNotification: [],
  isFetching: false,
  error: false,
  message: ''
};

const initStateListPayment = {
  listPayment: [],
  isFetching: false,
  error: false,
  message: ''
};

export const userState = (state = initStateUser, action) => {
  switch (action.type) {
    case "FETCHING_USER":
      return {
        ...state,
        user: {},
        isFetching: true,
        error: false
      };
    case "FETCHING_USER_SUCCESS":
      return {
        ...state,
        user: action.user,
        isFetching: false,
        error: false
      };
    case "FETCHING_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message
      };
    default:
      return state;
  }
};

export const listPostState = (state = initStateListPost, action) => {
  switch (action.type) {
    case "FETCHING_LIST_POST":
      return {
        ...state,
        listPost: [],
        isFetching: true,
        error: false
      };
    case "FETCHING_LIST_POST_SUCCESS":
      return {
        ...state,
        listPost: action.listPost,
        isFetching: false,
        error: false
      };
    case "FETCHING_LIST_POST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message
      };
    default:
      return state;
  }
};

export const listFollowingsState = (state = initStateListFollowings, action) => {
    switch (action.type) {
      case "FETCHING_LIST_FOLLOWINGS":
        return {
          ...state,
          listFollowings: [],
          isFetching: true,
          error: false
        };
      case "FETCHING_LIST_FOLLOWINGS_SUCCESS":
        return {
          ...state,
          listFollowings: action.listFollowings,
          isFetching: false,
          error: false
        };
      case "FETCHING_LIST_FOLLOWINGS_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
          message: action.message
        };
      default:
        return state;
    }
  };

  export const listNotificationState = (state = initStateListNotification, action) => {
    switch (action.type) {
      case "FETCHING_LIST_NOTIFICATION":
        return {
          ...state,
          listNotification: [],
          isFetching: true,
          error: false
        };
      case "FETCHING_LIST_NOTIFICATION_SUCCESS":
        return {
          ...state,
          listNotification: action.notification,
          isFetching: false,
          error: false
        };
      case "FETCHING_LIST_NOTIFICATION_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
          message: action.message
        };
      default:
        return state;
    }
  };

  export const listPaymentState = (state = initStateListPayment, action) => {
    switch (action.type) {
      case "FETCHING_PAYMENT":
        return {
          ...state,
          listPayment: [],
          isFetching: true,
          error: false
        };
      case "FETCHING_PAYMENT_SUCCESS":
        return {
          ...state,
          listPayment: action.payment,
          isFetching: false,
          error: false
        };
      case "FETCHING_PAYMENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
          message: action.message
        };
      default:
        return state;
    }
  };
