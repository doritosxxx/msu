import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

class RatingBlock extends React.Component{

	render(){
		return (
			<div className='rating-block'>
				<div className='rating-block__value'>
					{this.props.value}
				</div>
				<span className='rating-block__label'>{this.props.label}</span>
			</div>
		)
	}
}

RatingBlock.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
}

export default RatingBlock;