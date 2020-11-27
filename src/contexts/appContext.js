import React from 'react'

const AppContext = React.createContext({
	
})

class AppProvider extends React.Component{

	render(){
		return (<AppContext.Provider value={this.props.context}>
			{this.props.children}
		</AppContext.Provider>);
	}
	
}

function withAppState(Component){

	function WithAppState(props){
		return (
		<AppContext.Consumer>
			{ value => <Component {...props} {...value} />}
		</AppContext.Consumer>
		);
	}

	WithAppState.displayName = `WithAppState(${Component.displayName || Component.name || 'Component' })`

	return WithAppState;
}

export { AppProvider, withAppState };