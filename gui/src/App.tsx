import React, { useEffect, useState } from "react";
// import { Provider } from "react-redux";
import "antd/dist/antd.css";
// import Base from "./examples/Base";
import "./App.css";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "./layout/NavigationScroll";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
type DefaultState = {
  customization: any;
};

function App() {
  // const { height, width } = useWindowDimensions();
  // return (
  //   <Provider store={store}>
  //     <Base globalHeight={height} />
  //   </Provider>
  // );
  const customization = useSelector(
    (state: DefaultState) => state.customization
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
