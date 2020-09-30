import React from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Avatar, Separator, Subhead, Text, Group, List, PanelHeaderBack } from '@vkontakte/vkui'

import Header  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'

import teachers_list from '../../json/teachers_list.js'
import Teacher from '../../classes/Teacher'

export default class TeacherPanel extends React.Component{

	constructor(props){
		super()

		this.state = {
			teacherId: props.teacherId
		}

		document.addEventListener("")
	}

	getTeacherById(id){
		// тут какая-то логика

		return new Teacher(teachers_list[id-1]);
	}

	render(){

		const teacher = this.getTeacherById(this.state.teacherId)

		return (
			<Panel id={this.props.id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={this.props.goBack}/>}
				>
					<Header title='Преподаватель'></Header>
				</PanelHeader>
				<Div>
					<Group>
						<Cell
						before={<Avatar src={teacher.image} />}
						multiline
						>
							<TeacherDetails details={teacher.details}/>
						</Cell>
					</Group>
					<Group>
						<Subhead weight="bold">
							Категории
						</Subhead>
						<Text>
							aasdasd
						</Text>
						<Subhead weight="bold">
							Описание
						</Subhead>
						<Text>
							aasdasd
							dasd
						</Text>
					</Group>
					<Group>
						<Subhead weight="bold">
							Оценки
						</Subhead>
						<List>

						</List>
					</Group>
				</Div>
			</Panel>
		)
	}
};