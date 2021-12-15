import { LOADING_DATA } from "../constants/actionTypes";
import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";

// const initialState = {
//   data: {},
//   histogramData: {},
// };

// function rootReducer(state = initialState, action) {
//   if (action.type === LOADING_DATA) {
//     console.group("LOADING_DATA");
//     console.log("action.payload", action.payload);
//     console.groupEnd();
//     // console.info(action.payload);
//     return Object.assign({}, state, action.payload);
//   }
//   return state;
// }

// export default rootReducer;
const reducer = combineReducers({
  customization: customizationReducer,
});

export default reducer;
