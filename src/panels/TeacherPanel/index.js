import React, { useState, useEffect } from 'react'
import { Panel, PanelHeader, Div, Cell, Avatar, Subhead, Text, Group, List, PanelHeaderBack } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import Header  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'

import Server from '../../modules/Server'

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
			

		return (
			<Panel id={id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={goBack}/>}
				>
					<Header title='Преподаватель'></Header>
				</PanelHeader>
				<Div>
					<Group>
						<Cell
						before={<Avatar size={100} src={teacher.image} />}
						multiline
						>
							<TeacherDetails teacher={teacher}/>
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
		);
	}

	
	
}

export default TeacherPanel;