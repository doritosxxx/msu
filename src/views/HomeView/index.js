import React, { useState } from 'react'
import { ModalRoot, View }   from '@vkontakte/vkui'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'
import ReviewModal from '../../modals/ReviewModal'

const MODALS = {
	NONE: null,
	FILTERS: 'filters',
	REVIEW: 'review'
}

export default function HomeView(props){
	
	const [history, setHistory] = useState(['home'])
	const [activePanel, setActivePanel] = useState("home")
	const [activeModal, setActiveModal] = useState(MODALS.NONE)
	const [orderBy, setOrderBy] = useState('name')
	const [teacherId, setTeacherId] = useState(null)
	const [teachersList, setTeachersList] = useState(null)
	
	function openTeacherPage(id){
		const newHistory = [...history]
		newHistory.push('teacher')
		setHistory(newHistory)
		setTeacherId(id)
		setActivePanel('teacher')
	}

	function goBack(){
		const newHistory = [...history]
		newHistory.pop()
		setHistory(newHistory)
		setActivePanel(history[history.length-2])
	}

	function hideModal(){ 
		setActiveModal(null)
	}

	function onFiltersClick(){
		setActiveModal(MODALS.FILTERS)
	}

	const hideModalBinded = hideModal.bind(this)

	return (
		<View 
			id={props.id}
			activePanel={activePanel} 
			history={history}
			modal={
				<ModalRoot 
					activeModal={activeModal}
					onClose={hideModalBinded}
				>
					<FiltersModal 
						id={MODALS.FILTERS}
						hide={hideModalBinded}
						orderBy={orderBy}
						setOrderBy={setOrderBy.bind(this)}
					/>
					<ReviewModal
						id={MODALS.REVIEW}
						hide={hideModalBinded}
					/>
				</ModalRoot>
			}
		>
			<HomePanel 
				id='home' 
				onFiltersClick={onFiltersClick.bind(this)}
				orderBy={orderBy}
				openTeacherPage={openTeacherPage.bind(this)}
				teachersList={teachersList}
				setTeachersList={setTeachersList.bind(this)}
			/>
			<TeacherPanel
				id='teacher'
				setActiveModal={setActiveModal.bind(this)}
				teacherId={teacherId}
				goBack={goBack.bind(this)}
			/>
		</View>
	)
	
};