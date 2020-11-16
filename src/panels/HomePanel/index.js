import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader, Spinner } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'

import MODALS from '../../routing/modals'
import Server from '../../modules/Server'
import withAppState from '../../hoc/withAppState'

// TODO: фиксануть observer
function HomePanel({
	teachersList,
	setTeachersList,
	setActiveModal,
	...props }){
	
	const [isLoadingTeachersList, setIsLoadingTeachersList] = useState(false)

	//this.setUpObserver()

	// Настройка наблюдателя для 'ленивой загрузки' списка преподавателей
	const observer = {
		Instance: null,
		setup: () => {
			observer.Instance = new IntersectionObserver((entries) => {
				if (entries[0].intersectionRatio <= 0) 
					return;
				tryLoadNextChunk()
			}, {
				root: null,
				rootMargin: '0px',
				threshold: 0
			})
		},
		connect: () => {
			if(observer.Instance === null)
				observer.setup()
			const target = document.querySelector(".home-panel__teacher-list .teacher-cell:last-of-type")
			observer.Instance.observe(target)
		},
		disconnect: () => {
			if(observer.Instance !== null)
				observer.Instance.disconnect()
		}
	}


	// Функция нужна для обеспечения существования единственного активного запроса к серверу.
	const tryLoadNextChunk = () => {
		if(!isLoadingTeachersList)
			_loadNextChunk()
	}

	// Желательно использовать вместо этой функции tryLoadNextChunk
	const _loadNextChunk = () => {
		setIsLoadingTeachersList(true)

		try {
			(async () => {
				const offset = (teachersList ?? []).length
				const teachersListChunk = await Server.GetTeacherRange( offset , 10 )
				if(teachersList === null)
					teachersList = teachersListChunk
				else 
					teachersList.push(...teachersListChunk)
				
				// Внимание. Если удалить эту строчку, то содержимое списка на странице не будет обновляться.
				// Если все-таки решишь ее удалить, то напиши вместо нее this.forceUpdate()

				observer.disconnect()
				observer.connect()
				
				setIsLoadingTeachersList(false)
			})()
		}
		catch(ex){
			console.log(ex)
		}
	}

	/*
	componentDidMount(){
		if(this.state.teachersList === null)
			this.tryLoadNextChunk()
	}

	// Передаю список загруженных преподавателей родительскому компонету.
	componentWillUnmount(){
		this.props.setTeachersList(this.state.teachersList)
	}
	*/

	const getTeachers = () => teachersList ?? [];

	function onSearchChange(event){
		/* заморожено до появления api
		this.setState({
			search: event.target.value
		})*/
	}

	return (
		<Panel id={props.id}>
			<PanelHeader onClick={()=>{}/*this.props.scrollToTop*/}>
				<Header title='Преподаватели'></Header>
			</PanelHeader>
			<Group title="Search block">
				<CustomSearch 
					onFiltersClick={()=>setActiveModal(MODALS.FILTERS)}
					onSearchChange={onSearchChange}
				/>
			</Group>
			<Group title="Teacher list">
				<List className='home-panel__teacher-list'>
					{getTeachers().map(teacher => 
						<TeacherCell 
							teacher={teacher} 
							key={teacher.id}
						/>)}
				</List>
				{  
					isLoadingTeachersList &&
					<Spinner style={{marginBottom: 20}} size='large'/>
				}
			</Group>
		</Panel>
	)
	
}
HomePanel.propTypes = {
	id: PropTypes.string.isRequired,
	teachersList: PropTypes.oneOfType([
		(prop) => prop === null,
		PropTypes.array
	]),
	setTeachersList: PropTypes.func.isRequired,
	setActiveModal: PropTypes.func.isRequired,
}

export default withAppState(HomePanel);
