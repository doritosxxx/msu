import React from 'react'
import PropTypes from 'prop-types'

import { Placeholder } from '@vkontakte/vkui'
import { Icon56Users3Outline } from '@vkontakte/icons';

export default class CellNotFound extends React.Component {

	render(){
		return (
			<Placeholder
				icon={<Icon56Users3Outline/>}
			>
				Ничего не найдено. Попробуйте изменить фильтры.
			</Placeholder>
			
		)
	}
};