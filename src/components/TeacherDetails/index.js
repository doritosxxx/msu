import React from 'react'
import PropTypes from 'prop-types';

import TeacherRating from '../TeacherRating'

import './style.css'

class TeacherDetails extends React.Component{

	render(){
		return(
			<div className='teacher__details'>
				<div className='teacher__name'>{this.props.details.name}</div>
				<TeacherRating rating={this.props.details.rating}/>
			</div>
		)
	}
}

export default TeacherDetails;