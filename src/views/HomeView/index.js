import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ModalRoot, View }   from '@vkontakte/vkui'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'
import ReviewModal from '../../modals/ReviewModal'
import MainLoadingPopout from '../../popouts/MainLoadingPopout'
import Review from '../../classes/Review'

import { withAppState } from '../../contexts/appContext'
import MODALS from '../../enums/modals'

function HomeView(props){

	
	const [reviewData, setReviewData] = useState(new Review({}))


	function onClose(){
		props.setActiveModal(null)
	}

	function resetReview(){
		setReviewData(new Review({}))
	}

	return (
		<View 
			popout={props.hasPopout ? <MainLoadingPopout/> : null}
			id={props.id}
			activePanel={props.activePanel}
			modal={
				<ModalRoot 
					activeModal={props.activeModal}
					onClose={onClose}
				>
					<FiltersModal 
						id={MODALS.FILTERS}
						hide={onClose}
					/>
					<ReviewModal
						id={MODALS.REVIEW}
						onClose={onClose}
						hide={onClose}
						review={reviewData}
					/>
				</ModalRoot>
			}
		>
			<HomePanel id='home' />
			<TeacherPanel 
				id='teacher'
				resetReview={resetReview}
			/>
		</View>
	)
	
}

HomeView.propTypes = {
	activeModal: PropTypes.any,
	activePanel: PropTypes.string.isRequired,
	setActiveModal: PropTypes.func.isRequired,
	hasPopout: PropTypes.any.isRequired,
}

export default withAppState(HomeView);