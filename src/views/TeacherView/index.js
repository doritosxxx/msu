import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ModalRoot, Snackbar } from '@vkontakte/vkui'
import { Icon24ErrorCircle, Icon24CheckCircleOn } from '@vkontakte/icons'

import { TeacherPanel, LoaderPanel } from '../../panels'
import { ReviewModal } from '../../modals'

import Server from '../../modules/Server'
import ReviewData from '../../classes/ReviewData'
import HistoryContext from '../../contexts/HistoryContext'

class TeacherView extends Component {
	static contextType = HistoryContext

	constructor(props){
		super(props)

		this.state = {
			teacher: null,
			activePanel: 'blank',
			activeModal: null,
			snackbar: null,
			review: new ReviewData({}),
		}

		this.isReseting = false

		this.setModal = this.setModal.bind(this)
		this.setSnackbar = this.setSnackbar.bind(this)
		this.hideModal = this.hideModal.bind(this)
		this.submitComment = this.submitComment.bind(this)
		this.showBox = this.showBox.bind(this)
		this.showErrorBox = this.showErrorBox.bind(this)
		this.showSuccessBox = this.showSuccessBox.bind(this)
		this.setReview = this.setReview.bind(this)
	}

	componentDidMount(){
		this.resetData()
	}

	componentDidUpdate(){
		const teacher = this.state.teacher
		const id = this.context.params.id
		if(!this.isReseting && id && (teacher === null || teacher.id !== id))
			this.resetData(id)
	}

	resetData(teacherId){
		this.isReseting = true
		this.setState({
			activePanel: 'blank',
			activeModal: null,
			review: new ReviewData({}),
			snackbar: null,
			teacher: null,
		})
		const fetchData = async () => {
			const teacher = await Server.GetTeacherById(teacherId)
			this.setState({
				teacher,
			})
			this.isReseting = false
			// Важно делать это после установки teacher
			this.setState({
				activePanel:'teacher',
			})
		}
		if(teacherId)
			fetchData()
		else 
			this.isReseting = false	
	}

	showBox(message, icon){
		this.setSnackbar(message, icon)
	}

	showErrorBox(errorMessage){
		this.showBox(errorMessage, <Icon24ErrorCircle fill="#a00" />)
	}

	showSuccessBox(successMessage){
		this.showBox(successMessage, <Icon24CheckCircleOn fill="#0a0" />)
	}

	setSnackbar(message, icon=null){
		const onClose = () => this.setState({snackbar:null})
		this.setState({snackbar : <Snackbar before={icon} onClose={onClose}>{message}</Snackbar>})
	}

	setReview(review){
		this.setState({review})
	}

	async submitComment(){
		const comment = this.state.review
		const {success, message} = await Server.AddComment(comment, this.state.teacher)
		if(success)
			this.showSuccessBox(message)
		else 
			this.showErrorBox(message)
	}

	setModal(activeModal){
		this.setState({activeModal})
	}

	hideModal(){
		this.setModal(null)
	}

	render() {
		return (
			<View 
				id={this.props.id} 
				activePanel={this.state.activePanel} 
				modal={
					<ModalRoot 
						activeModal={this.state.activeModal}
						onClose={this.hideModal}
					>
						<ReviewModal
							id='review'
							setSnackbar={this.setSnackbar}
							review={this.state.review}
							hide={this.hideModal}
							submitComment={this.submitComment}
							setReview={this.setReview}
						/>
					</ModalRoot>
				}
			>
				<LoaderPanel id='blank'/>
				<TeacherPanel 
					id='teacher' 
					teacher={this.state.teacher}
					setModal={this.setModal}
					snackbar={this.state.snackbar}
				/>
			</View>
		)
	}
}

TeacherView.propTypes = {
	id: PropTypes.string.isRequired,
}

export default TeacherView;