import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import bridge from '@vkontakte/vk-bridge'
import { Panel, ScreenSpinner, View } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import HomeView from './views/HomeView'

import {
    Route,
    Switch,
    Redirect,
    withRouter
  } from 'react-router-dom'

const ROUTES = {
	HOME: 'home',
	TEACHER: 'teacher',
}

const App = (props) => {
	const [history] = useState(props.history)
	const [activePanel, setActivePanel] = useState(ROUTES.HOME)
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(< ScreenSpinner size='large' />);

	const [teachersList, setTeachersList] = useState(null)

	useEffect( () => {
		// Здесь может потребоваться загрузка какой-либо информации до отрисовки приложения.
		setPopout(null);
	})

	return (
		<HomeView></HomeView>
		/*
		<View activePanel='routing'>
			<Panel id='routing'>
				<Switch>
					<Route history={history} path={'/'+ROUTES.HOME} component={<div>home</div>}></Route>
					<Route history={history} path={'/'+ROUTES.TEACHER+':teacherId'} component={'teacher'}></Route>
					<Redirect from='/' to='/home'/>
				</Switch>
			</Panel>
		</View>
		*/
    );
}


export default withRouter(App);