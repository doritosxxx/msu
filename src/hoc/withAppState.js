import React from 'react'
import App from '../App'

function withAppState(Component){

	function WithAppState(props){
		const AppContext = App.Context
		return (
		<AppContext.Consumer>
			{value => <Component {...value} {...props} />}
		</AppContext.Consumer>
		);
	}

	WithAppState.displayName = `WithAppState(${Component.displayName || Component.name || 'Component' })`

	return WithAppState;
}

export default withAppState;