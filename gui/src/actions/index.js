import axios from "axios";
import {LOADING_DATA} from "../constants/actionTypes";

export function getData() {
  return function (dispatch, getState) {
    axios
      .post(
        "/test/",
        {
          who: "bobur",
        },
        { timeout: 160000 }
      )
      .then((response) => {
        const parsedData = JSON.parse(JSON.stringify(response.data));
        // alert(parsedData);
        dispatch({type: LOADING_DATA, payload: parsedData});
      });
  };
}
