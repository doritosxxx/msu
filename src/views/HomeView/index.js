import React from 'react'
import PropTypes from 'prop-types'
import { ModalRoot, View, Snackbar, Avatar }   from '@vkontakte/vkui'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'
import ReviewModal from '../../modals/ReviewModal'
import MainLoadingPopout from '../../popouts/MainLoadingPopout'
import Review from '../../classes/Review'

import { withAppState } from '../../contexts/appContext'
import MODALS from '../../enums/modals'

class HomeView extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			reviewData: new Review(),
			snackbar: null
		}

		this.setSnackbar = this.setSnackbar.bind(this)
		this.onClose = this.onClose.bind(this)
		this.setReview = this.setReview.bind(this)	
		this.resetReview = this.resetReview.bind(this)
	}
	
	onClose(){
		this.props.setActiveModal(null)
	}

	setReview(review){
		this.setState({ review })
	}

	resetReview(){
		this.setReview(new Review())
	}

	setSnackbar(text, icon=null){
		// if(this.state.snackbar !== null) return;

		this.setState({
			snackbar:(<Snackbar
				layout="horizontal"
				onClose={() => this.setState({snackbar:null})}
				before={<Avatar size={24} children={icon}/>}
			>{text}</Snackbar>)
		})
	}

	render(){
		return (
			<View 
				popout={this.props.hasPopout ? <MainLoadingPopout/> : null}
				id={this.props.id}
				activePanel={this.props.activePanel}
				modal={
					<ModalRoot 
						activeModal={this.props.activeModal}
						onClose={this.onClose}
					>
						<FiltersModal 
							id={MODALS.FILTERS}
							hide={this.onClose}
						/>
						<ReviewModal
							id={MODALS.REVIEW}
							hide={this.onClose}
							review={this.state.reviewData}
							setSnackbar={this.setSnackbar}
							user={this.props.user}
						/>
					</ModalRoot>
				}
			>
				<HomePanel id='home' />
				<TeacherPanel 
					id='teacher'
					resetReview={this.resetReview}
					snackbar={this.state.snackbar}
				/>
			</View>
		);
	}
	
}

HomeView.propTypes = {
	activeModal: PropTypes.any,
	activePanel: PropTypes.string.isRequired,
	setActiveModal: PropTypes.func.isRequired,
	hasPopout: PropTypes.any.isRequired,
}

export default withAppState(HomeView);