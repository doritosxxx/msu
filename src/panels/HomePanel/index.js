import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Group, List, PanelHeader, Spinner } from '@vkontakte/vkui'

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
			// TODO: Тут нет реактивности :(( памагити не хочу писать костыль
			// Не ссы, это уже не надо
			orderBy: props.order,
			teachersList: props.teachersList,
			isLoadingTeachersList: false

		}
	}

	componentDidMount(){
		// Тут надо придумать какую-нибудь оптимизацию.
		(async () => {
			const teachersList = await Server.GetTeacherRange(0, 10)
			this.setState({ teachersList })
		})()
		
	}

	// Передаю список загруженных преподавателей родительскому компонету.
	componentWillUnmount(){
		this.props.setTeachersList(this.state.teachersList)
	}

	// TODO: нужна декомпозиция
	get teachers () {
		const search = this.state.search.toLowerCase()

		// Фильтрация по поисковой строке.
		const list = this.state.teachersList.filter(item => {
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
					<List>
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
Home.propTypes = {
	id: PropTypes.string.isRequired,
	teachersList: PropTypes.oneOfType([
		PropTypes.arrayOf('Teacher'),
		null
	]),
	setTeachersList: PropTypes.func
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
