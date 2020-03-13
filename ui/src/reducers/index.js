import currentUser from "./currentUser";
import currentItems from "./currentItems";
import {combineReducers} from "redux";
import orderToProcess from "./orderToProcess";



const rootReducer = combineReducers({
    currentItems, currentUser,orderToProcess
});

export default rootReducer;