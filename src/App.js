import React, { useState, useEffect } from 'react'
import { ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import HomeView from './views/HomeView'
import { useRouter, useRouteNode } from 'react-router5'

const AppContext = React.createContext()

let isMiddlewareSettedup = false
const setupRouterMiddleware = (router, setActivePanel) => {
	if(isMiddlewareSettedup)
		return;

	isMiddlewareSettedup = true
	
	const middleware = (router) => (toState, fromState, done ) => {
		const panelName = toState.name
		setActivePanel(panelName)
		done()
	}

	router.useMiddleware(middleware)
}

const Root = (props) => {
	const { route } = useRouteNode('')
	const [activePanel, setActivePanel] = useState(route.name)
	
	// Настройка перехода между панелями при роутинге.
	const router = useRouter()
	setupRouterMiddleware(router, setActivePanel)

	// Все, что ниже нужно переписать(или дописать)
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(< ScreenSpinner size='large' />);

	const [teachersList, setTeachersList] = useState(null)

	const context = {
		activePanel,
		setActivePanel
	}
	
	useEffect( () => {
		
		// Здесь может потребоваться загрузка какой-либо информации до отрисовки приложения.
		setPopout(null);
	},[])

	return <AppContext.Provider value={context}>
		{props.children}
	</AppContext.Provider>;
}

const App = (props) =>(
	<Root>
		<HomeView/>
	</Root>
);

App.Context = AppContext;

export default App;