import React from 'react'
import PropTypes from 'prop-types';

import RatingBlock from '../RatingBlock'

import './style.css'

class TeacherRating extends React.Component{

	render(){
		const teacher = this.props.teacher
		return(
			<div className='rating__list'>
				<div className='rating_list--wrapper'>
					<RatingBlock label='Общая' value={teacher.formattedGeneral}/>
					<RatingBlock label='Понятность' value={teacher.formattedIntelligibility}/>
				</div>
				<div className='rating_list--wrapper'>
					<RatingBlock label='Доброта' value={teacher.formattedKindness}/>
					<RatingBlock label='Простота' value={teacher.formattedSimplicity}/>
				</div>
			</div>
		)
	}
}

TeacherRating.propTypes = {
	teacher: PropTypes.object.isRequired,
}

export default TeacherRating;