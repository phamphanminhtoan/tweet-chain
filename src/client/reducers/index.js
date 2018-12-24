import { combineReducers } from "redux";
import Test from "../containers/Test/reducer";
import App from "../containers/App/reducer";
import { reducer as toastrReducer } from "react-redux-toastr"; //Toastr
import { listPostState, listFollowingsState, userState, listNotificationState, listPaymentState } from "../containers/Profile/reducer";



const rootReducer = combineReducers({
    Test,
    App,
    listPostState,
    listFollowingsState,
    userState,
    listNotificationState,
    listPaymentState,
    toastr: toastrReducer
});

export default rootReducer;