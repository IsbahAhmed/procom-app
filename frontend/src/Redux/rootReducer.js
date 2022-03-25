import { combineReducers } from "redux";
import boardReducer from "./Board/boardReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer
})
export default rootReducer