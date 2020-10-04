import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from '@vkontakte/vkui'

function FiltersOrderRadio(props){

	return(
		<Radio
			value={props.value}
			name="orderRadio"
			defaultChecked={props.currentOrder === props.value}
			onChange={props.onChange}
		>
			{props.label}
		</Radio>
	)
}

FiltersOrderRadio.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	currentOrder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default FiltersOrderRadio;