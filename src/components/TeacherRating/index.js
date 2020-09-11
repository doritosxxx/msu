import React from 'react'
import PropTypes from 'prop-types';

import RatingBlock from '../RatingBlock'

import './style.css'

class TeacherRating extends React.Component{

	render(){
		const rating = this.props.rating
		return(
			<div className='rating__list'>
				<RatingBlock label='Понятность' value={rating.intelligibility}/>
				<RatingBlock label='Доброта' value={rating.kindness}/>
				<RatingBlock label='Простота' value={rating.simplicity}/>
			</div>
		)
	}
}

export default TeacherRating;