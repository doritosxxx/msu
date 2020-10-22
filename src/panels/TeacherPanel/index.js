import React, { useState, useEffect } from 'react'
import Marked from 'marked'
import DOMPurify from 'dompurify'
import { Panel, PanelHeader, Div, Cell, Avatar, Group, List, PanelHeaderBack, Header, Text } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import CustomHeader  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'

import Server from '../../modules/Server'
import ReviewCell from '../../components/ReviewCell'
import Review from '../../classes/Review'

class TeacherPanel extends React.Component{
	 
	constructor(props){
		super(props)

		this.state = {
			teacher : null
		}
	}

	componentDidMount() {
		(async () => {
			const teacher = await Server.GetTeacherById(this.props.teacherId)
			this.setState({ teacher })	
		})()
	}

	render(){
		const {id, goBack} = {...this.props}
		const teacher = this.state.teacher

		if(teacher === null)
			return <Panel id={id}></Panel>;
		// Тут нужен лоадер

		const additionalInfoHTML = Marked.parse(DOMPurify.sanitize(teacher.additionalInfo))

		return (
			<Panel id={id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={goBack}/>}
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
							<div dangerouslySetInnerHTML={{  __html : additionalInfoHTML }}/>
						</Text>
					</Group>
					<Group  header={<Header mode="primary">Оценки</Header>}>
						<List>
							{ [1,1,1].map((e,i)=><ReviewCell
								review={new Review()}
							></ReviewCell>)}
						</List>
					</Group>
				</Div>
			</Panel>
		);
	}

	
	
}

export default TeacherPanel;