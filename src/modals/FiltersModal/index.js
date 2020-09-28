import React from 'react';
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup} from '@vkontakte/vkui';
import { withPlatform, ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import FiltersSlider from '../../components/FiltersSlider'

export default class FiltersModal extends React.Component{

	constructor(props){
		super()

		this.state = {
			filters: props.filters
		}
	}


	render(){
		const hideModalBinded = this.props.hideModal
		const filters = this.props.filters
		return (
			<ModalPage 
				id={this.props.id}
				header={
					<ModalPageHeader
						left={withPlatform === 'android' && <PanelHeaderButton onClick={hideModalBinded}><Icon24Cancel/></PanelHeaderButton>}
						right={<PanelHeaderButton onClick={hideModalBinded}>{withPlatform === 'ios' ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
			<FormLayout>
				<FormLayoutGroup>
					<FiltersSlider
						top="Понятность"
						objectKey="intelligibility"
						setFiltersState={this.props.setFiltersState}
						default={filters.intelligibility}
						/>
					<FiltersSlider
						top="Доброта"
						objectKey="kindness"
						setFiltersState={this.props.setFiltersState}
						default={filters.kindness}
						/>
					<FiltersSlider
						top="Простота"
						objectKey="simplicity"
						setFiltersState={this.props.setFiltersState}
						default={filters.simplicity}
					/>
				</FormLayoutGroup>
			</FormLayout>
			</ModalPage>
		)
	}
}