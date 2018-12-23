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
        listPost: state.listPost.concat(action.listPost),
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
          listFollowings: state.listFollowings.concat(action.listFollowings),
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
