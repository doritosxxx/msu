import React from 'react'
import PropTypes from 'prop-types';

import './style.css';

class RatingBlock extends React.Component{

	render(){
		return (
			<div className='rating-block'>
				<span className='rating-block__label'>{this.props.label}</span>
				<div className='rating--block__value'>{this.props.value}/10</div>
			</div>
		)
	}
}

export default RatingBlock;