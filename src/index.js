import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Роутинг
import { RouterProvider } from 'react-router5'
import createRouter from './routing/create-router'
const router = createRouter()

bridge.send("VKWebAppInit")

router.start(() => {
	ReactDOM.render((
		<RouterProvider router={router}>
			<App/>
		</RouterProvider>
	), document.getElementById("root"))
})

// Если браузер начинает лагать и появляется много ошибок в консоли, то нужно отключить eruda,
// потому что она не справляется с большим количеством логов

if (process.env.NODE_ENV === "development") {
  	//import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
