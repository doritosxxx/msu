import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';

import HomePanel from '../../panels/HomePanel'


class HomeView extends React.Component{

	render(){
		return (
			<View id={this.props.id} activePanel="home">
				<HomePanel id='home'/>  
			</View>
		)
	}
}


export default HomeView;