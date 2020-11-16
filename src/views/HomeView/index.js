import React, { useState} from 'react'
import { ModalRoot, View }   from '@vkontakte/vkui'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'
import ReviewModal from '../../modals/ReviewModal'
import Review from '../../classes/Review'

import withAppState from '../../hoc/withAppState'
import MODALS from '../../routing/modals'

function HomeView({
	activeModal,
	setActiveModal, 
	teachersList,
	setTeachersList, 
	...props }){

	// TODO: перенести в App
	
	const [orderBy, setOrderBy] = useState('name')
	const [reviewData, setReviewData] = useState(new Review())


	function onClose(e){
		setActiveModal(null)
	}

	function onFiltersClick(){
		setActiveModal(MODALS.FILTERS)
	}

	return (
		<View 
			id={props.id}
			activePanel={props.activePanel}
			modal={
				<ModalRoot 
					activeModal={activeModal}
					onClose={onClose}
				>
					<FiltersModal 
						id={MODALS.FILTERS}
						hide={onClose}
						orderBy={orderBy}
						setOrderBy={setOrderBy.bind(this)}
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
			<HomePanel 
				id='home' 
				onFiltersClick={onFiltersClick.bind(this)}
				orderBy={orderBy}
				teachersList={teachersList}
				setTeachersList={setTeachersList.bind(this)}
			/>
			<TeacherPanel
				id='teacher'
				setActiveModal={setActiveModal.bind(this)}
			/>
		</View>
	)
	
}

export default withAppState(HomeView);