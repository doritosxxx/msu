import React from 'react'
import PropTypes from 'prop-types'
import { Group, HorizontalScroll, Header } from '@vkontakte/vkui'

import './style.css'

function FiltersCategoryGroup(props) {

	
	const elements = props.elements.map(e=><div>{e}</div>)
	let wrapperClassNames = "elements-wrapper"
	if(props.isScrollable)
		wrapperClassNames += " elements-wrapper--scrollable"

	return (

		<Group 
			header={<Header mode="primary">{props.label}</Header>
		}>
			<HorizontalScroll>
				<div className={wrapperClassNames}>
					{elements}
				</div>
			</HorizontalScroll>
		</Group>

	)
}

FiltersCategoryGroup.propTypes = {
	label: PropTypes.string,
	elements: PropTypes.array.isRequired,
	isScrollable: PropTypes.bool
}

export default FiltersCategoryGroup;