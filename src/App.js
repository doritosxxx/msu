import React from 'react'
import '@vkontakte/vkui/dist/vkui.css'

import MODALS from './enums/modals'
import ROUTES from './routing/routes'
import FILTERS from './enums/filters'
import HomeView from './views/HomeView'
import { withRouter } from 'react-router5'
import { AppProvider } from './contexts/appContext'

import bridge from "@vkontakte/vk-bridge"

class App extends React.Component {
	constructor(props){
		super(props)

		//console.log(bridge)
		this.isMiddlewareSetUp = false

		this.state = {
			activePanel: ROUTES[0].name,
			setActivePanel: this.setActivePanel.bind(this),
			activeModal: MODALS.NONE,
			setActiveModal: this.setActiveModal.bind(this),
			hasPopout: true,
			setPopout: this.setPopout.bind(this),
			user: null,
			teachersList: [],
			setTeachersList: this.setTeachersList.bind(this),
			orderBy: FILTERS[0],
			setOrderBy: this.setOrderBy.bind(this),
		}
		
	}

	setActivePanel(value){
		this.setState({
			activePanel: value
		})
	}

	setActiveModal(value){
		this.setState({
			activeModal: value
		})
	}

	setOrderBy(value){
		if(value !== this.state.orderBy)
		this.setState({
			orderBy: value,
			teachersList:[]
		})
	}

	setTeachersList(value){
		this.setState({
			teachersList: value
		})
	}

	// TODO: можно сделать плавное скрытие
	setPopout(value){
		this.setState({
			hasPopout: value
		})
	}
	
	
	componentDidMount(){
		// Configure router
		this.setupRouterMiddleware()


		// Fetch user data
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme')
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
				document.body.attributes.setNamedItem(schemeAttribute)
			}
		})

		const fetchData = async () => {
			// TODO: убрать коммент для продакшена
			const user = {}//await bridge.send('VKWebAppGetUserInfo')
			this.setState({
				user,
				hasPopout: false
			})
		}
		fetchData()
	}
	

	setupRouterMiddleware (){
		if(this.isMiddlewareSetUp)
			return;
			
		const middleware = () => (toState, fromState, done ) => {
			const panelName = toState.name
			this.state.setActivePanel(panelName)
			done()
		}
			
		this.props.router.useMiddleware(middleware)
		this.isMiddlewareSetUp = true
	}

	render(){
		
		return (<AppProvider context={this.state}>
			<HomeView/>
		</AppProvider>);
	}
}

export default withRouter(App);