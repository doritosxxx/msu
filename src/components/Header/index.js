import React from 'react'
import PropTypes from 'prop-types'
import { PanelHeader } from '@vkontakte/vkui'

import Logo from '../Logo'

import './style.css'

class Header extends React.Component{
	constructor(props){
		super()

		this.title = props.title
	}

	render(){
		return (
			<PanelHeader>
				<div className='header-wrapper'> 
					<Logo />
					<div className='header-wrapper__title'> 
						{this.title}
					</div>
				</div>
			</PanelHeader>
		)
	}
}

export default Header;