import currentDataReducer from "./currentDataReducer";
import loginReducer from "./login";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loginReducer,currentDataReducer
});
export default allReducers;
