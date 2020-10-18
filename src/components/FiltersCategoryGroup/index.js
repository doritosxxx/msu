import React from 'react'
import PropTypes from 'prop-types'
import { Group, HorizontalScroll, Header } from '@vkontakte/vkui'

import './style.css'

function FiltersCategoryGroup(props) {

	// Не знаю, в каком месте будет преобразование в React.Component
	const elements = props.elements.map(e=><div>{e}</div>)
	let wrapperClassNames = "elements-wrapper"
	if(props.isHorizontal)
		wrapperClassNames += " elements-wrapper--horizontal"

	return (
		<div>
			<Group header={<Header mode="primary">{props.label}</Header>}>
				<HorizontalScroll>
					<div className={wrapperClassNames}>
						{elements}
					</div>
				</HorizontalScroll>
			</Group>
		</div>
	)
}

FiltersCategoryGroup.propTypes = {
	label: PropTypes.string,
	elements: PropTypes.array.isRequired,
	isHorizontal: PropTypes.bool
}

export default FiltersCategoryGroup;