import React from 'react'
import PropTypes from 'prop-types'

import TeacherRating from '../TeacherRating'

import './style.css'

function TeacherDetails(props) {
	return(
		<div className='teacher__details'>
			<div className='teacher__name'>
				{props.teacher.fullName}
			</div>
			<TeacherRating teacher={props.teacher}/>
		</div>
	)

}

TeacherDetails.propTypes = {
	teacher: PropTypes.object.isRequired,
}



export default TeacherDetails;