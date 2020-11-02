import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader, Spinner } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CellNotFound from '../../components/CellNotFound'

import Server from '../../modules/Server'

class HomePanel extends React.Component{
	
	constructor(props){
		super(props)

		this.state = {
			search: '',
			// TODO: Тут нет реактивности :(( памагити не хочу писать костыль
			// Не ссы, это уже не надо
			orderBy: props.order,
			teachersList: props.teachersList,
			isLoadingTeachersList: false

		}

		this.setUpObserver()
		
	}

	// Настройка наблюдателя для 'ленивой загрузки' списка преподавателей
	setUpObserver(){
		this.observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio <= 0) 
				return;
			this.tryLoadNextChunk()
		}, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		})
	}

	// Функция нужна для обеспечения существования единственного активного запроса к серверу.
	tryLoadNextChunk(){
		if(!this.state.isLoadingTeachersList)
			this.loadNextChunk()
	}

	// Желательно использовать вместо этой функции tryLoadNextChunk
	loadNextChunk(){
		this.setState({isLoadingTeachersList: true})

		try{
			
			(async () => {
				const offset = (this.state.teachersList ?? []).length
				const teachersListChunk = await Server.GetTeacherRange( offset , 10 )
				if(this.state.teachersList === null)
					this.state.teachersList = teachersListChunk
				else 
					this.state.teachersList.push(...teachersListChunk)
				
				// Внимание. Если удалить эту строчку, то содержимое списка на странице не будет обновляться.
				// Если все-таки решишь ее удалить, то напиши вместо нее this.forceUpdate()
				this.setState({isLoadingTeachersList: false})

				this.observer.disconnect()
				const target = document.querySelector(".home-panel__teacher-list .teacher-cell:last-of-type")
				this.observer.observe(target)
			})()
			
		}
		catch(ex){
			console.log(ex)
		}
	}

	componentDidMount(){
		if(this.state.teachersList === null)
			this.tryLoadNextChunk()
	}

	// Передаю список загруженных преподавателей родительскому компонету.
	componentWillUnmount(){
		this.props.setTeachersList(this.state.teachersList)
	}


	// TODO: нужна декомпозиция
	// Вообще это старый код, который должен быть переписан
	get teachers () {
		const search = this.state.search.toLowerCase()

		// Фильтрация по поисковой строке.
		const list = this.state.teachersList.filter(item => {
			if (item.fullName.toLowerCase().indexOf(search) === -1 )
				return false;
			return true;
		})

		return list;

		/*
		// Сортировка по radio.
		return list.sort((a,b)=>{
			const criteria = this.state.orderBy
			console.log(criteria)
			if(criteria !== 'name')
				if( a.details.rating[criteria] !== b.details.rating[criteria] )
					return a.details.rating[criteria] - b.details.rating[criteria]

			return a.details.name < b.details.name ? -1 : 1;
		})
		*/
	}

	onSearchChange(event){
		this.setState({
			search: event.target.value
		})
	}

	render(){
		// Тут нужен лоадер
		if(this.state.teachersList === null)
			return <Panel id={this.props.id}></Panel>
		
		const teachers = this.teachers
		return (
			<Panel id={this.props.id}>
				<PanelHeader onClick={this.props.scrollToTop}>
					<Header title='Преподаватели'></Header>
				</PanelHeader>
				<Group title="Search block">
					<CustomSearch 
						onFiltersClick={this.props.onFiltersClick.bind(this)}
						onSearchChange={this.onSearchChange.bind(this)}
					/>
				</Group>
				<Group title="Teacher list">
					<List className='home-panel__teacher-list'>
						{teachers.map(teacher => 
							<TeacherCell 
								teacher={teacher} 
								key={teacher.id}
								openTeacherPage={this.props.openTeacherPage}
							/>)}
					</List>
					{  
						this.state.isLoadingTeachersList &&
						<Spinner style={{marginBottom: 20}} size='large'/>
					}
				</Group>
			</Panel>
		)
	}
}
HomePanel.propTypes = {
	id: PropTypes.string.isRequired,
	teachersList: PropTypes.oneOfType([
		(prop) => prop === null,
		PropTypes.array
	]),
	setTeachersList: PropTypes.func.isRequired
}

export default HomePanel;
