import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/index";
import { doNothingMiddleware } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(doNothingMiddleware, thunk))
);

const persister = "Free";

console.log(store);
export { store, persister };
