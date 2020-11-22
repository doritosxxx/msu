import React from 'react'
import '@vkontakte/vkui/dist/vkui.css'

import MODALS from './routing/modals'
import ROUTES from './routing/routes'
import HomeView from './views/HomeView'
import { withRouter } from 'react-router5'
import { AppProvider } from './contexts/appContext'

import bridge from "@vkontakte/vk-bridge";
import { ScreenSpinner } from '@vkontakte/vkui'

class App extends React.Component {
	constructor(props){
		super(props)
		this.isMiddlewareSetUp = false

		this.state = {
			activePanel: ROUTES[0].name,
			setActivePanel: this.setActivePanel.bind(this),
			activeModal: MODALS.NONE,
			setActiveModal: this.setActiveModal.bind(this),
			hasPopout: true,
			user: null,
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
	
	componentDidMount(){
		// Configure router
		this.setupRouterMiddleware()


		// Fetch user data
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		const fetchData = async () => {
			const user = await bridge.send('VKWebAppGetUserInfo');
			this.setState({
				user,
				hasPopout: false
			})
		}
		fetchData();
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