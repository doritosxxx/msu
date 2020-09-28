import React from 'react';
import PropTypes from 'prop-types';
import { ModalRoot, View }   from '@vkontakte/vkui';

import HomePanel from '../../panels/HomePanel'
import FiltersModal from '../../modals/FiltersModal'

class HomeView extends React.Component{
	
	constructor(){
		super()

		this.state = {
			activePanel: "home",
			activeModal: null,
			filters: {
				kindness:[1,10],
				simplicity:[1,10],
				intelligibility:[1,10]
			}
		}
	}

	hideModal() { 
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
				/>  
			</View>
		)
	}
}


export default HomeView;