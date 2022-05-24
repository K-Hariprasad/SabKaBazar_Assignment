import { combineReducers, createStore } from "redux";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({cartState: cartReducer, userState: userReducer})
const store = createStore(rootReducer);

export default store;
