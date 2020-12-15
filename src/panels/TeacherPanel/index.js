import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Group, List, PanelHeaderBack, Header, Text, Spinner, Placeholder, Button } from '@vkontakte/vkui'
import { CustomHeader, AvatarStretched, TeacherDetails, SubjectsList, SendReviewButton, ReviewCell } from '../../components'

import {Icon56ErrorOutline} from '@vkontakte/icons'

import Server from '../../modules/Server'

class TeacherPanel extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			comments: null,
		}
	}

	componentDidMount(){
		const fetchData = async () => {
			try{
				const comments = await Server.GetReviewsByTeacherId(this.props.teacher.id)
				this.setState({comments})
			}
			catch(error){
				console.log(error.message)
			}
		}
		fetchData()
	}

	getWrappedCommentsList(){
		return this.state.comments.map((review, i)=><ReviewCell review={review} key={review.id ?? i} />);
	}
	
	render() {

		const teacher = this.props.teacher
		let content;
		
		if(teacher === null || !teacher.exists())
			content = (<Placeholder
				icon={<Icon56ErrorOutline/>}
				stretched={true}
				header={"Произошла ошибка во время запроса к серверу"}
				action={<Button size="xl" onClick={()=>window.history.back()}>На главную</Button>}
			/>);
		else 
			content = (<Div>
				<Group>
					<Cell
					before={<AvatarStretched size={100} src={teacher.image} />}
					multiline
					>
						<TeacherDetails 
							highlightLastName
							teacher={teacher}
						/>
					</Cell>
				</Group>
				<Group>
					<SubjectsList subjects={teacher.subjects} defaultMessage="Предметы не указаны"/>
				</Group>
				<Group>
					<Text style={{
						display:"flex",
						alignItems: "center"
					}}>
						{teacher.facultyName}
						<SubjectsList subjects={teacher.departments} defaultMessage="Кафедры не указаны"/>
					</Text>
					<Text>
						<div dangerouslySetInnerHTML={{  __html : teacher.additionalInfo }}/>
					</Text>
				</Group>
				<Group  header={<Header mode="primary">Оценки</Header>}>
					<List>
						{ this.state.comments === null ? <Spinner size="large"/> : this.getWrappedCommentsList() }
					</List>
				</Group>
				<SendReviewButton
					onClick={()=>this.props.setModal('review')}
				/>
			</Div>);

		return (
			<Panel id={this.props.id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={()=>window.history.back()} />}
				>
					<CustomHeader title='Преподаватель'/>
				</PanelHeader>
				{content}
				{this.props.snackbar}
			</Panel>
		)
	}
}

TeacherPanel.propTypes = {
	id: PropTypes.string.isRequired,
	teacher: PropTypes.object,
	setModal: PropTypes.func,
	snackbar: PropTypes.node,
}

export default TeacherPanel;