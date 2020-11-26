// Тут огромные проблемы с производительностью
// Компонент обновляется миллион раз 
import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader, Spinner } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'

import MODALS from '../../enums/modals'
import Server from '../../modules/Server'
import { withAppState } from '../../contexts/appContext'

// Настройка наблюдателя для 'ленивой загрузки' списка преподавателей
const observer = {
	Instance: null,
	setup(callback){
		this.Instance = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio <= 0) 
				return;
			callback()
		}, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		})
	},
	connect(){
		if(this.Instance === null)
			this.setup()
		const target = document.querySelector(".page-end-mark")
		console.log(target);
		this.Instance.observe(target)
	},
	disconnect(){
		if(this.Instance !== null)
			this.Instance.disconnect()
	},
	dispose(){
		this.disconnect();
		this.Instance = null;
	}
}

class HomePanel extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isSpinnerEnabled: true,
		}
		this.isTeachersListFetched = false
	}

	// Функция нужна для обеспечения существования единственного активного запроса к серверу.
	tryLoadNextChunk() {
		if(!this.isTeachersListFetched)
			this._loadNextChunk()
	}

	// Использовать вместо этой функции tryLoadNextChunk.
	_loadNextChunk() {
		this.isTeachersListFetched = true

		try {
			(async () => {
				const offset = this.props.teachersList.length
				const teachersListChunk = await Server.GetTeachersRange( offset , 10 )
				
				this.isTeachersListFetched = false

				// Если загрузил все из базы
				if(teachersListChunk.length === 0){
					if(this.state.isSpinnerEnabled === true)
						this.setState({
							isSpinnerEnabled: false
						})
					return;
				}
				else {
					if(this.state.isSpinnerEnabled === false)
						this.setState({
							isSpinnerEnabled: true
						})
				}
				
				this.props.setTeachersList(
					this.props.teachersList.concat(teachersListChunk)
				)


			})()
		}
		catch(ex){
			console.error(ex)
			this.isTeachersListFetched = false
		}
	}

	componentDidMount(){
		console.log("home did mount")
		
	}
	
	componentDidUpdate(){
		console.log("home did update")

		observer.dispose();
		observer.setup(this.tryLoadNextChunk.bind(this))
		observer.connect()

	}

	componentWillUnmount(){
		console.log("home will unmount")
	}

	
	onSearchChange(event){
		/* заморожено до появления api
		this.setState({
			search: event.target.value
		})*/
	}

	render(){
		return (
			<Panel id={this.props.id}>
				<PanelHeader onClick={()=>{}/*this.props.scrollToTop*/}>
					<Header title='Преподаватели'></Header>
				</PanelHeader>
				<Group title="Search block">
					<CustomSearch 
						onFiltersClick={()=>this.props.setActiveModal(MODALS.FILTERS)}
						onSearchChange={this.onSearchChange}
					/>
				</Group>
				<Group title="Teacher list">
					<List className='home-panel__teacher-list'>
						{this.props.teachersList.map(teacher => 
							<TeacherCell 
								teacher={teacher} 
								key={teacher.id}
							/>)}
					</List>
					<div className="page-end-mark" style={{
						height:'5px'
					}}/>
					{
						(this.state.isSpinnerEnabled ? (<Spinner 
								className='teachers-list__spinner'
								style={{marginBottom: 20}} 
								size='large'
							/>) : "")
					}
					
				</Group>
			</Panel>
		);
	}
	
}

HomePanel.propTypes = {
	id: PropTypes.string.isRequired,
	setActiveModal: PropTypes.func.isRequired,
}

export default withAppState(HomePanel);
