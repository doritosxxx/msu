import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

bridge.send("VKWebAppInit")

ReactDOM.render((
	<App/>
), document.getElementById("root"))


// Если браузер начинает лагать и появляется много ошибок в консоли, то нужно отключить eruda,
// потому что она не справляется с большим количеством логов.

if (process.env.NODE_ENV === "development") {
  	import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
