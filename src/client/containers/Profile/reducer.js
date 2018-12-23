//Init Value of State
const initStateListPost = {
  listPost: [],
  isFetching: false,
  error: false
};

const initStateListFollowings = {
    listFollowings: [],
    isFetching: false,
    error: false
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
        error: true
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
          error: true
        };
      default:
        return state;
    }
  };
