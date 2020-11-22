import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Avatar, Group, List, PanelHeaderBack, Header, Text, ScreenSpinner, Spinner } from '@vkontakte/vkui'

import CustomHeader  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'
import ReviewCell from '../../components/ReviewCell'
import SendReviewButton from '../../components/SendReviewButton'

import Server from '../../modules/Server'
import Review from '../../classes/Review'

import {withAppState} from '../../contexts/appContext'

import { useRouteNode } from 'react-router5'

function TeacherPanel(props){
	 
	const {route} = useRouteNode('')

	//console.warn(router)

	const teacherId = route.params.id
	const [teacher, setTeacher] = useState(null)
	const [isReviewModalOpened, setIsReviewModalOpened] = useState(false)
	const [reviewsList, setReviewsList] = useState(null)

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

			const _reviews = await Server.GetReviewsByTeacherId(teacherId)
			setReviewsList(_reviews)
		})()
	},[])

	const getWrappedReviewsList = () => (reviewsList.map((_,i)=><ReviewCell review={new Review()} key={i} />))

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
					{/* список предметов */}
				</Group>
				<Group>
					<Text>{`${teacher.facultyName} ${teacher.departments.join(" ")}`}</Text>
					<Text>
						<div dangerouslySetInnerHTML={{  __html : teacher.additionalInfo }}/>
					</Text>
				</Group>
				<Group  header={<Header mode="primary">Оценки</Header>}>
					<List>
						{ reviewsList === null ? <Spinner size="large"/> : getWrappedReviewsList() }
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
	id: PropTypes.string,
	setActiveModal: PropTypes.func,
	//resetReview: PropTypes.func.isRequired
}


export default withAppState(TeacherPanel);