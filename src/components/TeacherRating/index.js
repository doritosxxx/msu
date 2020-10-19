import React from 'react'
import PropTypes from 'prop-types';

import RatingBlock from '../RatingBlock'

import './style.css'

class TeacherRating extends React.Component{

	render(){
		const teacher = this.props.teacher
		return(
			<div className='rating__list'>
				<RatingBlock label='Общая' value={teacher.formattedGeneral}/>
				<RatingBlock label='Понятность' value={teacher.formattedIntelligibility}/>
				<RatingBlock label='Доброта' value={teacher.formattedKindness}/>
				<RatingBlock label='Простота' value={teacher.formattedSimplicity}/>
			</div>
		)
	}
}

export default TeacherRating;