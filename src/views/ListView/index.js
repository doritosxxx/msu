import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ModalRoot } from '@vkontakte/vkui'
import { ListPanel, LoaderPanel } from '../../panels'
import { FiltersModal } from '../../modals'
import Server from '../../modules/Server'

class ListView extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			activePanel: 'blank',
			activeModal: null,
			teachers: [],
			order: 'score_general',
			isFullListFetched : false,
		}

		this.isFetching = false

		this.setModal = this.setModal.bind(this)
		this.hideModal = this.hideModal.bind(this)
		this.setOrder = this.setOrder.bind(this)

		this.tryLoadNextChunk = this.tryLoadNextChunk.bind(this)
		this._loadNextChunk = this._loadNextChunk.bind(this)
	}

	tryLoadNextChunk(){
		if(this.isFetching || this.state.isFullListFetched)
			return;
		this._loadNextChunk()
	}

	// Не вызывать несколько раз одновременно.
	_loadNextChunk(){
		this.isFetching = true

		try {
			(async () => {
				const offset = this.state.teachers.length
				const сhunk = await Server.GetTeachersRange( offset , 10 )

				// Если загрузил все из базы
				if(сhunk.length === 0){
					this.setState({
						isFullListFetched: true,
					})
				}
				else 
					this.setState(state => ({
						teachers: state.teachers.concat(сhunk),
					}))

				this.isFetching = false
			})()
		}
		catch(ex){
			console.error(ex)
			this.isFetching = false
		}
	}

	setModal(activeModal){
		this.setState({activeModal})
	}

	hideModal(){
		this.setModal(null)
	}

	setOrder(order){
		this.setState({order})
	}

	componentDidMount(){
		this.setState({activePanel: 'list'})
	}
	
	render() {
		return (
			<View 
				id={this.props.id} 
				activePanel={this.state.activePanel}
				modal={<ModalRoot 
					activeModal={this.state.activeModal}
					onClose={this.hideModal}
				>
					<FiltersModal 
						id='filters'
						hide={this.hideModal}
						order={this.state.order}
						setOrder={this.setOrder}
					/>
				</ModalRoot>}
			>
				<LoaderPanel id='blank'/>
				<ListPanel 
					id='list'
					teachers={this.state.teachers}
					setModal={this.setModal}
					isFullListFetched={this.state.isFullListFetched}
					loadChunk={this.tryLoadNextChunk}
				/>
			</View>
		)
	}
}

ListView.propTypes = {
	id: PropTypes.string.isRequired,
}

export default ListView;