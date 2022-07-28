import { combineReducers } from "redux";
import { garbageReducer } from "./reducers/garbageReducer";


const appReducer = combineReducers({
  garbage: garbageReducer,

});

const rootReducer = (state: any, action: any) => {
  if (action.type === null) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
