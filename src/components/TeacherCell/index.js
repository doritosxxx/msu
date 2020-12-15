import React from 'react'
import PropTypes from 'prop-types'

import { Cell } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'
import AvatarStretched from '../AvatarStretched'

class TeacherCell extends React.Component{

	render(){
		const teacher = this.props.teacher
		return (
			<Cell
				onClick={this.props.onClick}
				className='teacher-cell'
				before={<AvatarStretched size={80} src={teacher.image} />}
				multiline
				expandable
			>
				<TeacherDetails teacher={teacher}/>
			</Cell>
		)
	}
}

TeacherCell.propTypes = {
	teacher: PropTypes.object.isRequired,
	onClick: PropTypes.func,
}

export default TeacherCell;