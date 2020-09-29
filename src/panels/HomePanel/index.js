import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CellNotFound from '../../components/CellNotFound'

import teachers_list from '../../json/teachers_list.js'
import Teacher from '../../classes/Teacher'

class Home extends React.Component{
	
	constructor(props){
		super()

		this.state = {
			search: '',
			filters: props.filters
		}

		///fetch teachers list
		this.teachersList = teachers_list.map(teacher => new Teacher(teacher))
		
	}

	get teachers () {
		const search = this.state.search.toLowerCase()
		const filters = this.props.filters
		return this.teachersList.filter(item=>{

			if (item.details.name.toLowerCase().indexOf(search) == -1 )
				return false;

			for(const pair of Object.entries(item.details.rating)){
				const [category, value] = [...pair]
				const limit = filters[category]
				if( !(limit[0] <= value && value <= limit[1]) )
					return false;
			}
			return true;
		})
	}


	onSearchChange(event){
		this.setState({
			search: event.target.value
		})
	}


	render(){
		const teachers = this.teachers
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
						{     teachers.length == 0
						  	? <CellNotFound/>
						  	: teachers.map(teacher => 
						  	  <TeacherCell 
								teacher={teacher} 
								key={teacher.id}
								openTeacherPage={this.props.openTeacherPage}
							/>
							)
						}
						
					</List>
					
				</Group>
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
