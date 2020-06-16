import axios from "axios";
import { LOADING_DATA } from "../constants/actionTypes";

export function getData(name) {
  console.log("afewlfjlwifejawoefiwjae");
  return function(dispatch, getState) {
    axios
      .post(
        "/getData/",
        {
          name: name,
          meta: "tbd"
        },
        { timeout: 160000 }
      )
      .then(response => {
        const parsedData = JSON.parse(JSON.stringify(response.data));
        // alert(parsedData);
        let data = {};
        data[name] = parsedData;
        console.log(parsedData);
        dispatch({ type: LOADING_DATA, payload: {data: data} });
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
