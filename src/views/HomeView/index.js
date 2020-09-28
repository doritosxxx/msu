import React from 'react';
import PropTypes from 'prop-types';
import { ModalRoot, View }   from '@vkontakte/vkui';

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'
import TeacherPanel from '../../panels/TeacherPanel';

class HomeView extends React.Component{
	
	constructor(){
		super()

		this.state = {
			history:['home'],
			activePanel: "home",
			activeModal: null,
			filters: {
				kindness:[0,10],
				simplicity:[0,10],
				intelligibility:[0,10]
			},
			teacherId: null
		}
	}

	get filters(){
		return this.state.filters
	}

	get getTeacherId(){
		return this.state.teacherId
	}

	openTeacherPage(id){
		const history = [...this.state.history]
		history.push('teacher')
		this.setState({
			teacherId: id,
			activePanel: 'teacher',
			history: history
		})

	}

	goBack(){
		const history = [...this.state.history]
		history.pop()
		this.setState({
			history,
			activePanel: history[history.length-1]
		})
	}

	hideModal(){ 
		this.setState({ activeModal: null })
	}

	onFiltersClick(){
		this.setState({ activeModal: 'filters' })
	}

	setFiltersState(newFiltersState){
		// Возможно эта функция ресурсозатратная (но скорее всего нет)
		const filters = {...this.state.filters}
		Object.entries(newFiltersState)
			  .forEach(entry=>filters[entry[0]] = entry[1])
		this.setState({ filters })
	}

	render(){
		const hideModalBinded = this.hideModal.bind(this)
		return (
			<View 
				id={this.props.id}
				activePanel={this.state.activePanel} 
				history={this.state.history}
				modal={
					<ModalRoot 
						activeModal={this.state.activeModal}
						onClose={hideModalBinded}
					>
						<FiltersModal 
							id="filters" 
							hideModal={hideModalBinded} 
							filters={this.state.filters}	
							setFiltersState={this.setFiltersState.bind(this)}
						/>
					</ModalRoot>
				}
			>
				<HomePanel 
					id='home' 
					onFiltersClick={this.onFiltersClick.bind(this)}
					filters={this.filters}
					openTeacherPage={this.openTeacherPage.bind(this)}
				/>
				<TeacherPanel
					id='teacher'
					teacherId={this.getTeacherId}
					goBack={this.goBack.bind(this)}
				/>
			</View>
		)
	}
}


export default HomeView;