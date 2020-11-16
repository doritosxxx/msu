import React, { useState, useEffect } from 'react'
import { ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import HomeView from './views/HomeView'
import { useRouter } from 'react-router5'
import withAppState from './hoc/withAppState'

import { useRouteNode } from 'react-router5'

const AppContext = React.createContext()

let isMiddlewareSettedup = false
const setupRouterMiddleware = (router, setActivePanel) => {
	if(isMiddlewareSettedup)
		return;

	isMiddlewareSettedup = true

	console.log("App.js setup middleware")
	
	const middleware = (router) => (toState, fromState, done ) => {
		const panelName = toState.name
		setActivePanel(panelName)
		done()
	}

	router.useMiddleware(middleware)
}

const Root = (props) => {
	
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(< ScreenSpinner size='large' />);

	const [teachersList, setTeachersList] = useState(null)
	const { route } = useRouteNode('')

	const [activePanel, setActivePanel] = useState(route.name)
	const router = useRouter()
	setupRouterMiddleware(router, setActivePanel)

	const children = props.children
	const context = {
		activePanel,
		setActivePanel
	}
	
	useEffect( () => {
		
		// Здесь может потребоваться загрузка какой-либо информации до отрисовки приложения.
		setPopout(null);
	},[])

	return <AppContext.Provider value={context}>
		{children}
	</AppContext.Provider>;
}

const App = (props) => {

	return (
		<Root>
			<HomeView/>
		</Root>
	)
};

App.Context = AppContext;


export default App;