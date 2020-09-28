import React from 'react';
import PropTypes from 'prop-types';
import { Epic, View, Tabbar, TabbarItem } from '@vkontakte/vkui';
import {Icon28Users3Outline, Icon28UserAddOutline } from '@vkontakte/icons';

import HomeView from '../../views/HomeView'
import EditView from '../../views/EditView'

class Navigation extends React.Component {

	constructor(){
		super()

		this.state = {
			activeStory: 'home'
		};
		this.onStoryChange = this.onStoryChange.bind(this);
	}

	onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story })
	}

	render(){
		return(
			<Epic activeStory={this.state.activeStory} tabbar={
				<Tabbar>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'home'}
						data-story="home"
						text="Преподаватели"
					>
						<Icon28Users3Outline/>	
					</TabbarItem>
					<TabbarItem
						onClick={this.onStoryChange}
						selected={this.state.activeStory === 'edit'}
						data-story="edit"
						text="Редактировать"
					>
						<Icon28UserAddOutline/>
					</TabbarItem>
				</Tabbar>
			}>
				<HomeView id="home"/>
				<EditView id="edit"/>
				
			</Epic>
		)
	}
}

export default Navigation;