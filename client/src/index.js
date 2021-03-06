import React from "react";
import ReactDOM from "react-dom";
import "./assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/style.scss";
import "./assets/style_grey.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

//redux store
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import store from "./redux/store/index.js";

require("dotenv").config();

ReactDOM.render(
  <ToastProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ToastProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
