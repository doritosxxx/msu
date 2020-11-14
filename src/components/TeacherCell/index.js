import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	render(){
		const teacher = this.props.teacher
		return (
			<Cell
				href={"/teacher?id=" + teacher.id}
				className='teacher-cell'
				before={<Avatar size={80} src={teacher.image} />}
				multiline
				expandable
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