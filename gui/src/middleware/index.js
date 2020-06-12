import {LOADING_DATA} from "../constants/actionTypes";

export function doNothingMiddleware({getState, dispatch}) {
    return function (next) {
        return function (action) {
            if (action.type === LOADING_DATA) {
                // Do something
            }
            return next(action);
        };
    };
}
