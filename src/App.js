import React from 'react'
import '@vkontakte/vkui/dist/vkui.css'
import { ListView, TeacherView } from './views/'
import bridge from '@vkontakte/vk-bridge'
import { Root, ConfigProvider } from '@vkontakte/vkui'
import HistoryContext from './contexts/HistoryContext'

import Server from './modules/Server'

class App extends React.Component {
	constructor(props){
		super(props)

		const startView = 'list'

		this.state = {
			// Начальный View.
			activeView: startView,
			params: [{}],
  			history: [startView],
		}
		this.goBack = this.goBack.bind(this)
		this.goToPage = this.goToPage.bind(this)
	}	

	goBack(){
		const history = this.state.history
		const params = this.state.params
		
		if( history.length <= 1 ) 
			// Выход из приложения.
			bridge.send("VKWebAppClose", {"status": "success"})
		else {
			params.pop()
			history.pop()
			this.setState({ 
				activeView: history[history.length - 1]
			})
		}
	}

	goToPage( name, params = {} ) {
		// Зачем { view: name }, если можно просто {}?
		window.history.pushState( { view: name }, name )
		this.setState({ 
			activeView: name, 
			// Возможны проблемы с производительностью. Лучше использовать concat.
			history: [...this.state.history, name],
			params: [...this.state.params, params],
		})
	}

	componentDidMount(){
		window.addEventListener('popstate', () => this.goBack())

		const fetchData = async () => {
			let user;
			if (process.env.NODE_ENV === "development")
				user = {}
			else 
			 	user = await bridge.send('VKWebAppGetUserInfo')
			this.setState({
				user,
				hasPopout: false
			})
			Server.userId = user.id ?? 0
		}
		fetchData()
	}

	render(){
		const history = {
			params: this.state.params[this.state.params.length-1],
			goBack: this.goBack,
			goToPage: this.goToPage,
		}
		
		return (
		<ConfigProvider isWebView={true}>
			<HistoryContext.Provider value={history}>
				<Root activeView={this.state.activeView}>
					<ListView id='list'/>
					<TeacherView id='teacher'/>
				</Root>
			</HistoryContext.Provider>
		</ConfigProvider>);
	}
}

export default App;