import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'

import './style.css'

class Header extends React.Component{
	constructor(props){
		super()

		this.title = props.title
	}

	render(){
		return (
			<div className='header-wrapper'> 
				<Logo />
				<div className='header-wrapper__title'> 
					{this.title}
				</div>
			</div>
		)
	}
}

export default Header;