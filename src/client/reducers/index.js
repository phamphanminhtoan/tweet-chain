import { combineReducers } from "redux";
import Test from "../containers/Test/reducer";
import App from "../containers/App/reducer";
import { listPostState, listFollowingsState } from "../containers/Profile/reducer";



const rootReducer = combineReducers({
    Test,
    App,
    listPostState,
    listFollowingsState
});

export default rootReducer;