import React, { useState, useEffect } from 'react'
import { ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'


import HomeView from './views/HomeView'


const App = (props) => {
	
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(< ScreenSpinner size='large' />);

	const [teachersList, setTeachersList] = useState(null)

	useEffect( () => {
		// Здесь может потребоваться загрузка какой-либо информации до отрисовки приложения.
		setPopout(null);
	},[])

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


export default App;