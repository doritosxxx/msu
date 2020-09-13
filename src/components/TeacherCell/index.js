import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	constructor(){
		super()

		this.teacher = this.props.teacher
	}

	render(){
		return (
			<Cell
				before={<Avatar src={this.teacher.image} />}
			>
				<TeacherDetails details={this.teacher.details}/>
			</Cell>
		)
	}
}

export default TeacherCell;