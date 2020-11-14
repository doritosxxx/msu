import React, { useState } from 'react'
import { ModalRoot, View }   from '@vkontakte/vkui'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'
import ReviewModal from '../../modals/ReviewModal'
import Review from '../../classes/Review'

import { useRouteNode } from 'react-router5'

const MODALS = {
	NONE: null,
	FILTERS: 'filters',
	REVIEW: 'review'
}

export default function HomeView(props){
	
	const { route } = useRouteNode('')
	// For debug.
	console.log( route )
	const [activePanel, setActivePanel] = useState(route.name)

	const [activeModal, setActiveModal] = useState(MODALS.NONE)
	const [orderBy, setOrderBy] = useState('name')
	const [teachersList, setTeachersList] = useState(null)
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
			activePanel={activePanel}
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
	
};