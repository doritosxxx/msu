import React from 'react'
import '@vkontakte/vkui/dist/vkui.css'

import MODALS from './routing/modals'
import ROUTES from './routing/routes'
import HomeView from './views/HomeView'
import { withRouter } from 'react-router5'

import { AppProvider } from './contexts/appContext'



class App extends React.Component {
	constructor(props){
		super(props)

		this.isMiddlewareSetUp = false

		this.state = {
			activePanel: ROUTES[0].name,
			setActivePanel: this.setActivePanel.bind(this),
			activeModal: MODALS.NONE,
			setActiveModal: this.setActiveModal.bind(this),
		}
		
/*
		// Все, что ниже, нужно переписать(или дописать)
		const [fetchedUser, setUser] = useState(null);
		const [popout, setPopout] = useState(< ScreenSpinner size='large' />);
*/
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
		console.log("app did mount")
		//fetch user
		//setPopout(null);

		// Configure router
		this.setupRouterMiddleware()
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