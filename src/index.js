// React, Redux, Middleware
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// Root reducer and saga
import rootReducer from "./redux/reducers/_root.reducer"; // imports ./redux/reducers/index.js
import rootSaga from "./redux/sagas/_root.saga"; // imports ./redux/sagas/index.js

// App
import App from "./components/App/App";

// MUI
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

// Theme/Palette/Font declaration
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#20292e",
    },
    secondary: {
      main: "#629508",
    },
    background: {
      default: "#243b48",
      paper: "#20292e",
    },
  },
  typography: {
    fontFamily: ["Dosis", "sans-serif"].join(","),
    h5: {
      color: "#629508",
    },
    h6: {
      color: "#629508",
    },
  },
});

// Theme overrides
theme.overrides = {
  MuiButton: {
    containedPrimary: {
      backgroundColor: theme.palette.secondary.main,
    },
    containedSecondary: {
      backgroundColor: theme.palette.primary.light,
    },
  },

  MuiFab: {
    primary: {
      backgroundColor: theme.palette.secondary.main,
    },
    secondary: {
      backgroundColor: "#f50057",
    },
  },
};

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList =
  process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList)
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

// Render, ThemeProvider, Redux Provider, CSSBaseline
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("react-root")
);
