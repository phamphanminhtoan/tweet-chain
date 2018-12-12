import { combineReducers } from "redux";
import Test from "../containers/Test/reducer";
import App from "../containers/App/reducer";


const rootReducer = combineReducers({
    Test,
    App
});

export default rootReducer;