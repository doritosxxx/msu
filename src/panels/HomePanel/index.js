import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'

import teachers_list from '../../json/teachers_list.js'
import Teacher from '../../classes/Teacher'

class Home extends React.Component{
	
	constructor(){
		super()

		this.state = {
			search: ''
		}

		///fetch teachers list
		this.teachersList = teachers_list.map(teacher => new Teacher(teacher))
		
	}

	get teachers () {
		const search = this.state.search.toLowerCase()
		return this.teachersList.filter(item => item.details.name.toLowerCase().indexOf(search) > -1 )
	}


	onSearchChange(event){

		console.log(event.target.value)
		this.setState({
			search: event.target.value
		})
	}


	render(){
		return (
			<Panel id={this.props.id}>
				<PanelHeader>
					<Header title='Преподаватели'></Header>
				</PanelHeader>
				<Group title="Search block">
					<CustomSearch 
						onFiltersClick={this.props.onFiltersClick.bind(this)}
						onSearchChange={this.onSearchChange.bind(this)}
					/>
				</Group>
				<Group title="Teacher list">
					<List>
						{ this.teachers.map(teacher => <TeacherCell teacher={teacher} key={teacher.id}/>) }
					</List>
					
				</Group>
				{/*
				<Group title="Navigation Example">
					<Div>
						<Button size="xl" level="2" onClick={go} data-to="persik">
							Show me the Persik, please
						</Button>
					</Div>
				</Group>
				*/}
			</Panel>
		)
	}
}
/*
Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};
*/
export default Home;
