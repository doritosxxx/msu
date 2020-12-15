import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelHeader, Group, List, Spinner } from '@vkontakte/vkui'
import { CustomHeader, CustomSearch, TeacherCell } from '../../components'

import HistoryContext from '../../contexts/HistoryContext'

const observer = {
	Instance: null,
	setup(callback){
		this.Instance = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) 
				callback()
		}, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		})
	},
	connect(){
		const target = document.querySelector(".page-end-mark")
		this.Instance.observe(target)
	},
	disconnect(){
		if(this.Instance !== null)
			this.Instance.disconnect()
	}
}

class ListPanel extends Component {
	static contextType = HistoryContext
	constructor(props) {
		super(props)
	
		this.state = {
			 
		}
	}

	componentDidMount(){
		observer.setup(this.props.loadChunk)
		observer.connect()
	}

	componentWillUnmount(){
		observer.disconnect()
	}
	

	render() {
		const spinner = (!this.props.isFullListFetched ? (<Spinner 
			className='teachers-list__spinner'
			style={{marginBottom: 20}} 
			size='large'
		/>) : "");

		return (
			<Panel id={this.props.id}>
				<PanelHeader onClick={()=>{}/*this.props.scrollToTop*/}>
					<CustomHeader title='Преподаватели'/>
				</PanelHeader>
				<Group title="Search block">
					<CustomSearch 
						onIconClick={()=>this.props.setModal('filters')}
						//onSearchChange={this.onSearchChange}
					/>
				</Group>
				<Group title="Teacher list">
					<List className='home-panel__teacher-list'>
						{this.props.teachers.map(teacher => 
							<TeacherCell 
								onClick={()=>this.context.goToPage('teacher', {id:teacher.id})}
								teacher={teacher} 
								key={teacher.id}
							/>)}
					</List>
					<div className="page-end-mark" style={{
						height:'5px',
					}}/>
					{ spinner }
				</Group>
			</Panel>
		)
	}
}

ListPanel.propTypes = {
	id: PropTypes.string.isRequired,
	teachers: PropTypes.array.isRequired,
	setModal: PropTypes.func.isRequired,
	isFullListFetched: PropTypes.bool.isRequired,
	loadChunk: PropTypes.func.isRequired,
}

export default ListPanel;