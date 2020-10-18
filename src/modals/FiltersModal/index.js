import React, { useState } from 'react'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup} from '@vkontakte/vkui';
import { usePlatform , ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import FiltersRadio from '../../components/FiltersOrderRadio'
import FiltersCategoryGroup from '../../components/FiltersCategoryGroup'


export default function FiltersModal(props) {
	const [orderBy, setOrderBy] = useState(props.orderBy)

	function setRadioOrderBy(event){
		props.setOrderBy(event.target.value)
		setOrderBy(event.target.value)
	}


	const hideModalBinded = props.hideModal
	// TODO: добавить кнопку "сброс"
	return (
		<ModalPage 
			id={props.id}
			header={
				<ModalPageHeader
					left={
						usePlatform() === ANDROID 
						&& <PanelHeaderButton onClick={hideModalBinded}>
							<Icon24Cancel/>
						</PanelHeaderButton>
					}
					right={
					<PanelHeaderButton onClick={hideModalBinded}>
						{usePlatform() === IOS ? 'Готово' : <Icon24Done />}
					</PanelHeaderButton>}
				>
					Фильтры
				</ModalPageHeader>
			}
		>
		<FormLayout>
			<FiltersCategoryGroup
				label="Год"
				isHorizontal
				elements={[1,2,3,4,128739182,123123,12,3,123,123,"sas",123,123,123,12,3]}
			/>
			<FiltersCategoryGroup
				label="Семестр"
				elements={[1,2,3,4,5,7,8,9]}
			/>
			{/*
			<FormLayoutGroup top="Сортировать по">
				<FiltersRadio
					value='name'
					label='Имя'
					currentOrder={orderBy}
					onChange={setRadioOrderBy.bind(this)}
				/>
				<FiltersRadio
					value='intelligibility'
					label='Понятность'
					currentOrder={orderBy}
					onChange={setRadioOrderBy.bind(this)}
				/>
				<FiltersRadio
					value='kindness'
					label='Доброта'
					currentOrder={orderBy}
					onChange={setRadioOrderBy.bind(this)}
				/>
				<FiltersRadio
					value='simplicity'
					label='Простота'
					currentOrder={orderBy}
					onChange={setRadioOrderBy.bind(this)}
				/>
			</FormLayoutGroup>
			*/}
		</FormLayout>
		</ModalPage>
	)
	
}