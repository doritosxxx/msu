import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	render(){
		const teacher = this.props.teacher
		return (
			<Cell
				className='teacher-cell'
				before={<Avatar size={80} src={teacher.image} />}
				multiline
				expandable
				onClick={()=>this.props.openTeacherPage(teacher.id)}
			>
				<TeacherDetails teacher={teacher}/>
			</Cell>
		)
	}
}

TeacherCell.propTypes = {
	teacher: PropTypes.object.isRequired
}

export default TeacherCell;