import React from 'react'

import { Panel, Group, List, PanelHeader } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CellNotFound from '../../components/CellNotFound'

import Server from '../../modules/Server'

class Home extends React.Component{
	
	constructor(props){
		super(props)

		this.state = {
			search: '',
			//TODO: Тут нет реактивности :(( памагити не хочу писать костыль
			orderBy: props.orderBy
		}

		// А не перенести ли это в state для обеспечения реактивности?
		this.teachersList = []
	}

	componentDidMount(){
		// Тут надо придумать какую-нибудь оптимизацию.
		(async () => {
			this.teachersList = await Server.GetTeacherRange(0, 100)
			this.forceUpdate()
		})()
		
	}

	// TODO: нужна декомпозиция
	get teachers () {
		const search = this.state.search.toLowerCase()

		// Фильтрация по поисковой строке.
		const list = this.teachersList.filter(item => {
			if (item.full_name.toLowerCase().indexOf(search) === -1 )
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
					<List>
						{     teachers.length === 0
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
