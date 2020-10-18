import React, { useState } from 'react'
import { ModalRoot, View }   from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel'

export default function HomeView(props){
	
	const [history, setHistory] = useState(['home'])
	const [activePanel, setActivePanel] = useState("home")
	const [activeModal, setActiveModal] = useState(null)
	const [orderBy, setOrderBy] = useState('name')
	const [teacherId, setTeacherId] = useState(null)
	
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
		setActiveModal('filters')
	}

	function scrollToTop(){
		console.log("trying to scroll")
		bridge.send("Scroll", {
			top: 0,
			speed: 1000
		})
		.then(r=>console.log(r))
		.catch(e=>console.log(e))
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
						id="filters" 
						hideModal={hideModalBinded}
						orderBy={orderBy}
						setOrderBy={setOrderBy.bind(this)}
					/>
				</ModalRoot>
			}
		>
			<HomePanel 
				id='home' 
				onFiltersClick={onFiltersClick.bind(this)}
				orderBy={orderBy}
				openTeacherPage={openTeacherPage.bind(this)}
				scrollToTop={scrollToTop}
			/>
			<TeacherPanel
				id='teacher'
				teacherId={teacherId}
				goBack={goBack.bind(this)}
			/>
		</View>
	)
	
};