import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

class RatingBlock extends React.Component{

	constructor(props){
		super(props)
		this.label = props.label
		this.sign = props.value >= 0 ? "+" : "-"
		this.value = `${Math.abs(props.value)}`
	}

	render(){
		return (
			<div className='rating-block'>
				<div className='rating-block__value'>
					<span className="rating--block__value-sign">{this.sign}</span>
					{this.value}
				</div>
				<span className='rating-block__label'>{this.label}</span>
			</div>
		)
	}
}

RatingBlock.propTypes = {
	value: PropTypes.number, //.isRequired,
	label: PropTypes.string.isRequired
}

export default RatingBlock;