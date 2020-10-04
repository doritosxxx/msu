import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Avatar, Subhead, Text, Group, List, PanelHeaderBack } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import Header  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'

import teachers_list from '../../json/teachers_list.js'
import Teacher from '../../classes/Teacher'

export default function TeacherPanel(props){

	const [teacherId, setTeacherId] = useState(props.teacherId)


	const getTeacherById = (id) =>{
		// тут какая-то логика
		return new Teacher(teachers_list[id-1]);
	}
	
	const teacher = getTeacherById(teacherId)

	useEffect(() => {
		/*
		async function fetchData(){
			await bridge.send("Scroll", {
				top: 100,
				speed:2000
			})
		}
		fetchData()
		*/
	})

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
	
};