import axios from "axios";
import { LOADING_DATA } from "../constants/actionTypes";

export const SET_MENU = "@customization/SET_MENU";
export const MENU_TOGGLE = "@customization/MENU_TOGGLE";
export const MENU_OPEN = "@customization/MENU_OPEN";
export const SET_FONT_FAMILY = "@customization/SET_FONT_FAMILY";
export const SET_BORDER_RADIUS = "@customization/SET_BORDER_RADIUS";

export function getData() {
  return function (dispatch, getState) {
    axios
      .post(
        "/getData/",
        {
          dataName: "histogram",
          meta: "tbd",
        },
        { timeout: 160000 }
      )
      .then((response) => {
        const parsedData = JSON.parse(JSON.stringify(response.data));
        // alert(parsedData);
        let data = getState.data;
        data = parsedData;
        // console.log(parsedData);
        dispatch({ type: LOADING_DATA, payload: { data: data } });
      });
  };
}

// export function getData() {
//   return function (dispatch, getState) {
//     axios
//       .post(
//         "/test/",
//         {
//           who: "bobur",
//         },
//         { timeout: 160000 }
//       )
//       .then((response) => {
//         const parsedData = JSON.parse(JSON.stringify(response.data));
//         // alert(parsedData);
//         dispatch({type: LOADING_DATA, payload: parsedData});
//       });
//   };
// }
