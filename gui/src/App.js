import React from "react";
import "./App.css";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import store from "./store";
import Layout from "./components/Layout";
import {Provider} from "react-redux";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: "#FFF",
    },
  },

  // typography: {
  //     // h1
  //     // h2
  //     // h3
  //     // h4
  //     // h5
  //     // h6
  //     // subtitle1
  //     // subtitle2
  //     // body1
  //     // body2
  //     // button
  //     // caption
  //     // overline

  //     fontSize: 11,

  //     // Title
  //     h1: {
  //         fontSize: 20,
  //         fontFamily: "Arial"
  //     },
  //     // View title
  //     h6: {
  //         fontSize: 17,
  //         fontWeight: 100,
  //         fontStyle: 'regular',
  //     },
  //     // Subtitle
  //     subtitle1: {
  //         fontSize: 13
  //     },
  //     // axis % legend
  //     subtitle2: {
  //         fontSize: 11
  //     }
  // }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout/>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
