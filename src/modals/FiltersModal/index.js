import React, { useState } from 'react';
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup} from '@vkontakte/vkui';
import { usePlatform , ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import FiltersSlider from '../../components/FiltersSlider'

export default function FiltersModal(props) {

	const [filters, setFilters] = useState(props.filters)

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
			<FormLayoutGroup>
				<FiltersSlider
					top="Понятность"
					objectKey="intelligibility"
					setFiltersState={props.setFiltersState}
					default={filters.intelligibility}
					/>
				<FiltersSlider
					top="Доброта"
					objectKey="kindness"
					setFiltersState={props.setFiltersState}
					default={filters.kindness}
					/>
				<FiltersSlider
					top="Простота"
					objectKey="simplicity"
					setFiltersState={props.setFiltersState}
					default={filters.simplicity}
				/>
			</FormLayoutGroup>
		</FormLayout>
		</ModalPage>
	)
	
}