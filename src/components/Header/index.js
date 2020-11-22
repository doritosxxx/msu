import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'

import './style.css'

class Header extends React.Component{
	render(){
		return (
			<div className='header-wrapper'> 
				<Logo />
				<div className='header-wrapper__title'> 
					{this.props.title}
				</div>
			</div>
		)
	}
}

Header.propTypes = {
	title: PropTypes.string
}

export default Header;