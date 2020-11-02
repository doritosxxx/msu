import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as StarSVG } from '../../img/star.svg'

import './style.css'

// Возможно, стоит конеретизировать название.
function Star(props){
	

	return (
	<div 
		className={'stars-range--star' + (props.isFilled ? ' filled' : '')}
		onClick={props.onClick}	
	>
		<StarSVG/>
	</div>);

}

Star.propTypes = {
	isFilled : PropTypes.bool,
	onClick: PropTypes.func.isRequired
}

export default Star;