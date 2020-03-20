import currentUser from "./currentUser";
import currentItems from "./currentItems";
import {combineReducers} from "redux";




const rootReducer = combineReducers({
    currentItems, currentUser
});

export default rootReducer;