import React from 'react'
import PropTypes from 'prop-types'

import TeacherRating from '../TeacherRating'

import './style.css'

function TeacherDetails(props) {

	//props.highlightLastName ?? false;

	const teacher = props.teacher;

	return(
		<div className='teacher__details'>
			<div className='teacher__name'>
				{teacher.full_name}
			</div>
			<TeacherRating teacher={teacher}/>
		</div>
	)

}

TeacherDetails.propTypes = {
	teacher: PropTypes.instanceOf('Teacher'),
	highlightLastName: PropTypes.bool
}



export default TeacherDetails;