import React from 'react'
import PropTypes from 'prop-types'
import RatingBlock from '../RatingBlock'

import './style.css'

class Rating extends React.Component{
	constructor(props){
		super(props)

		this.simplicity = props.rating.simplicity
		this.kindness = props.rating.kindness
		this.intelligibility = props.rating.intelligibility
		
	}

	render(){
		return (
			<div className='rating--wrapper'>
				<RatingBlock label='халявность' value={this.simplicity}/>
				<RatingBlock label='понятность' value={this.intelligibility}/>
				<RatingBlock label='доброта' value={this.kindness}/>
			</div>
		);
	}

}

Rating.propTypes = {
	rating : PropTypes.object.isRequired
}

export default Rating;