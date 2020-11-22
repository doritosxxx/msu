import React from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Div, Cell, Avatar, Group, List, PanelHeaderBack, Header, Text, ScreenSpinner, Spinner, Placeholder, Button } from '@vkontakte/vkui'

import CustomHeader  from '../../components/Header'
import TeacherDetails from '../../components/TeacherDetails'
import ReviewCell from '../../components/ReviewCell'
import SendReviewButton from '../../components/SendReviewButton'

import Server from '../../modules/Server'
import Review from '../../classes/Review'

import { withAppState } from '../../contexts/appContext'
import { withRoute } from 'react-router5'
import Teacher from '../../classes/Teacher'

class TeacherPanel extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			teacher: null,
			isReviewModalOpened: false,
			reviewsList: null,
		}
		this.teacherId = props.route.params.id ?? -1
	}


	// эта штука вызывает бесконечный цикл. надо пофиксить
	// O_o и без нее все работает. Почему?
	//props.resetReview()

	// TODO: обработать случай некорректного id

	openReviewModal(){
		//setIsReviewModalOpened(true)
		//props.setActiveModal('review')
	}

	componentDidMount(){
		this.props.setPopout(true)
		const fetchData = async () => {
			const teacher = new Teacher({})//await Server.GetTeacherById(this.teacherId)
			this.setState({teacher})
			this.props.setPopout(false)

			const reviewsList = await Server.GetReviewsByTeacherId(this.teacherId)
			this.setState({reviewsList})
		}
		fetchData()
	}
	

	getWrappedReviewsList(){
		return this.state.reviewsList.map((review,i)=><ReviewCell review={new Review(review)} key={i} />);
	}

	render(){
		const teacher = this.state.teacher
		let content;
		
		if(teacher === null || !teacher.exists())
			content = (<Placeholder
				stretched={true}
				header={"Произошла ошибка во время запроса к серверу"}
				action={<Button size="xl" onClick={()=>window.history.back()}>Перейти обратно</Button>}
			/>)
		else 
			content = (<Div>
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
					{ /*список предметов*/ }
				</Group>
				<Group>
					<Text>{`${teacher.facultyName} ${teacher.departments.join(" ")}`}</Text>
					<Text>
						<div dangerouslySetInnerHTML={{  __html : teacher.additionalInfo }}/>
					</Text>
				</Group>
				<Group  header={<Header mode="primary">Оценки</Header>}>
					<List>
						{ this.state.reviewsList === null ? <Spinner size="large"/> : this.getWrappedReviewsList() }
					</List>
				</Group>
				<SendReviewButton 
					isModalOpened={this.state.isReviewModalOpened}
					onClick={this.openReviewModal.bind(this)}
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
		</Panel>
		);
	}
	
}

TeacherPanel.propTypes = {
	id: PropTypes.string.isRequired,
	setActiveModal: PropTypes.func.isRequired,
	setPopout: PropTypes.func.isRequired,
	//resetReview: PropTypes.func.isRequired
}

export default withRoute(withAppState(TeacherPanel));