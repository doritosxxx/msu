import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

bridge.send("VKWebAppInit");



ReactDOM.render((<Router history={createBrowserHistory()}><App/></Router>), document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
