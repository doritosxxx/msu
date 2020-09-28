import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	render(){
		const teacher = this.props.teacher
		return (
			<Cell
				before={<Avatar src={teacher.image} />}
				multiline
				expandable
				onClick={()=>this.props.openTeacherPage(teacher.id)}
			>
				<TeacherDetails details={teacher.details}/>
			</Cell>
		)
	}
}

export default TeacherCell;