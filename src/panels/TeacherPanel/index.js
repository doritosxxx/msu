import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Avatar, Group, List, PanelHeaderBack, Header, Text, ScreenSpinner } from '@vkontakte/vkui'

import CustomHeader  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'
import ReviewCell from '../../components/ReviewCell'
import SendReviewButton from '../../components/SendReviewButton'

import Server from '../../modules/Server'
import Review from '../../classes/Review'

import { useRouteNode } from 'react-router5'

function TeacherPanel(props){
	 
	const {route, router} = useRouteNode('')

	//console.warn(router)

	const teacherId = route.params.id
	const [teacher, setTeacher] = useState(null)
	const [isReviewModalOpened, setIsReviewModalOpened] = useState(false)

	// эта штука вызывает бесконечный цикл. надо пофиксить
	// O_o и без нее все работает. Почему?
	//props.resetReview()

	// TODO: обработать случай некорректного id

	const openReviewModal = () => {
		setIsReviewModalOpened(true)
		props.setActiveModal('review')
	}

	useEffect(()=>{
		(async () => {
			const _teacher = await Server.GetTeacherById(teacherId)
			setTeacher(_teacher)
		})()
	},[])

	

	if(teacher === null)
		return <Panel id={props.id}>
			<ScreenSpinner></ScreenSpinner>
		</Panel>;
		// Тут нужен лоадер

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={()=>window.history.back()} />}
			>
				<CustomHeader title='Преподаватель'></CustomHeader>
			</PanelHeader>
			<Div>
				<Group>
					<Cell
					before={<Avatar size={100} src={teacher.image} />}
					multiline
					>
						<TeacherDetails 
							highlightLastName
							teacher={teacher}
						/>
					</Cell>
				</Group>
				<Group>
					{/* список тегов */}
				</Group>
				<Group>
					<Text>{`${teacher.facultyId} ${teacher.departmentId} - какие-то id`}</Text>
					<Text>
						<div dangerouslySetInnerHTML={{  __html : teacher.additionalInfo }}/>
					</Text>
				</Group>
				<Group  header={<Header mode="primary">Оценки</Header>}>
					<List>
						{ [1,1,1].map((e,i)=><ReviewCell
							review={new Review()}
							key={i}
						></ReviewCell>)}
					</List>
				</Group>
			</Div>
			<SendReviewButton 
				isModalOpened={isReviewModalOpened}
				onClick={openReviewModal.bind(this)}
			/>
		</Panel>
	);
	
}

TeacherPanel.propTypes = {
	id: PropTypes.string
	//resetReview: PropTypes.func.isRequired
}


export default TeacherPanel;