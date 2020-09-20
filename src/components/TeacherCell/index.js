import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	render(){
		return (
			<Cell
				before={<Avatar src={this.props.teacher.image} />}
				multiline
			>
				<TeacherDetails details={this.props.teacher.details}/>
			</Cell>
		)
	}
}

export default TeacherCell;