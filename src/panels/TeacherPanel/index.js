import React, { useState, useEffect } from 'react'
import { Panel, PanelHeader, Div, Cell, Avatar, Group, List, PanelHeaderBack, Header, Text } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import CustomHeader  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'
import ReviewCell from '../../components/ReviewCell'
import SendReviewButton from '../../components/SendReviewButton'

import Server from '../../modules/Server'
import Review from '../../classes/Review'

class TeacherPanel extends React.Component{
	 
	constructor(props){
		super(props)

		this.state = {
			teacher : null,
			isReviewModalOpened : false 
		}
	}

	openReviewModal(){
		this.setState({isReviewModalOpened: true})
		this.props.setActiveModal('review')
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
					//isModalOpened={this.state.isReviewModalOpened}
					onClick={this.openReviewModal.bind(this)}
				/>
			</Panel>
		);
	}

	
	
}

export default TeacherPanel;