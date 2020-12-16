import React from 'react'
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, withPlatform} from '@vkontakte/vkui';
import { ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import FiltersCategoryGroup from '../../components/FiltersCategoryGroup'


class FiltersModal extends React.Component {
	// TODO: добавить кнопку "сброс"

	filtersElements = {
		year:[],
		semester:[],
		order:[
			{label:"Общая оценка", payload:"score_general"},
			{label:"Простота", payload:"score_simplicity"},
			{label:"Доброта", payload:"score_kindness"},
			{label:"Понятность", payload:"score_intelligibility"},
			{label:"Фамилия", payload:"last_name"},
		]
	}
	
	render(){
		return (
			<ModalPage 
				id={this.props.id}
				header={
					<ModalPageHeader
						left={
							this.props.platform === ANDROID 
							&& <PanelHeaderButton onClick={this.props.hide}>
								<Icon24Cancel/>
							</PanelHeaderButton>
						}
						right={
						<PanelHeaderButton onClick={this.props.hide}>
							{this.props.platform === IOS ? 'Применить' : <Icon24Done />}
						</PanelHeaderButton>}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
			<FormLayout>
				{/*
				<FiltersCategoryGroup
					label="Год"
					elements={this.filtersElements.year}
				/>
				<FiltersCategoryGroup
					label="Семестр"
					elements={this.filtersElements.semester}
				/>*/}
				<FiltersCategoryGroup
					onElementClick={payload=>{
						const index = this.filtersElements.order.findIndex(entry=>entry.payload === payload)
						this.props.setOrder(index)
					}}
					label="Сортировка по"
					elements={this.filtersElements.order}
					default={this.props.order}
				/>
			</FormLayout>
			</ModalPage>
		)
	}
	
}

FiltersModal.propTypes = {
	id: PropTypes.string.isRequired,
	hide: PropTypes.func.isRequired,
	setOrder: PropTypes.func.isRequired,
}

export default withPlatform(FiltersModal);