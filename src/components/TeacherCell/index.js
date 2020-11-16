import React from 'react'
import PropTypes from 'prop-types'

import { Cell, Avatar } from '@vkontakte/vkui'
import { Link } from 'react-router5'

import TeacherDetails from '../TeacherDetails'

class TeacherCell extends React.Component{

	render(){
		const teacher = this.props.teacher
		return (
			<Link
				routeName="teacher"
				routeParams={{
					id:teacher.id
				}}
				style={{textDecoration:'none'}}>
				<Cell
					className='teacher-cell'
					before={<Avatar size={80} src={teacher.image} />}
					multiline
					expandable
					onClick={()=>console.log(teacher.id)}
				>
					<TeacherDetails teacher={teacher}/>
				</Cell>
			</Link>
		)
	}
}

TeacherCell.propTypes = {
	teacher: PropTypes.object.isRequired
}

export default TeacherCell;