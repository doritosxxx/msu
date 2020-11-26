import React from 'react'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, withPlatform} from '@vkontakte/vkui';
import {  ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import FiltersCategoryGroup from '../../components/FiltersCategoryGroup'
import { withAppState } from '../../contexts/appContext'

import FILTERS from "../../enums/filters"

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
		const props = this.props
		return (
			<ModalPage 
				id={props.id}
				header={
					<ModalPageHeader
						left={
							props.platform === ANDROID 
							&& <PanelHeaderButton onClick={props.hide}>
								<Icon24Cancel/>
							</PanelHeaderButton>
						}
						right={
						<PanelHeaderButton onClick={props.hide}>
							{props.platform === IOS ? 'Готово' : <Icon24Done />}
						</PanelHeaderButton>}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
			<FormLayout>
				<FiltersCategoryGroup
					label="Год"
					elements={this.filtersElements.year}
				/>
				<FiltersCategoryGroup
					label="Семестр"
					elements={this.filtersElements.semester}
				/>
				<FiltersCategoryGroup
					onElementClick={(payload)=>{
						this.props.setOrderBy(payload)
					}}
					label="Сортировка по"
					elements={this.filtersElements.order}
					default={FILTERS[this.props.orderBy]}
				/>
			</FormLayout>
			</ModalPage>
		)
	}
	
}
export default withAppState(withPlatform(FiltersModal));