import React, { useState, useEffect } from 'react'
import { Panel, PanelHeader, Div, Cell, Avatar, Subhead, Text, Group, List, PanelHeaderBack } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import Header  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'

import teachers_list from '../../json/teachers_list.js'
import Teacher from '../../classes/Teacher'
import Server from '../../modules/Server'

export default function TeacherPanel(props){

	const [teacherId, setTeacherId] = useState(props.teacherId)


	const getTeacherById = (id) =>{
		// тут какая-то логика
		return new Teacher(teachers_list[id-1]);
	}
	
	const teacher = getTeacherById(teacherId)


	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={props.goBack}/>}
			>
				<Header title='Преподаватель'></Header>
			</PanelHeader>
			<Div>
				<Group>
					<Cell
					before={<Avatar size={100} src={teacher.image} />}
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
	
};