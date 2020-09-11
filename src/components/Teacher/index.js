import React from 'react'
import PropTypes from 'prop-types';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import TeacherDetails from '../TeacherDetails'

//import './style.css'

class Teacher extends React.Component{

	render(){
		return (
			<Cell
				before={<Avatar src={this.props.teacher.image} />}
			>
				<TeacherDetails details={this.props.teacher.details}/>
			</Cell>
		)
	}
}

export default Teacher;