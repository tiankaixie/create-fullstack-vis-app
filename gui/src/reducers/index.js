import { LOADING_DATA } from "../constants/actionTypes";

const initialState = {
    data: {
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === LOADING_DATA) {
        console.info("Data Loaded");
        console.info(action.payload);
        return Object.assign({}, state, action.payload);
    }
    return state;
}

export default rootReducer;
