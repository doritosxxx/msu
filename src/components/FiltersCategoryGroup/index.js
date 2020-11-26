import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Group, HorizontalScroll, Header } from '@vkontakte/vkui'
import FiltersCategoryGroupElement from '../../components/FiltersCategoryGroupElement'

import './style.css'

// Говнокод. Давай по новой, Миша, всё хуйня.

function FiltersCategoryGroup(props) {

	const [selected, setSelected] = useState(props.default ?? null)

	let wrapperClassNames = "elements-wrapper"
	if(props.isScrollable)
		wrapperClassNames += " elements-wrapper--scrollable"

	const onClick = props.onElementClick ?? (()=>{})
	const children = (props.elements ?? []).map((element,i)=><FiltersCategoryGroupElement
		key={i} 
		label={element.label}
		onClick={()=>{
			onClick(element.payload)
			setSelected(i)
		}}
		isSelected={i === selected}
	/>)
	

	return (

		<Group 
			header={<Header mode="primary">{props.label}</Header>
		}>
			<HorizontalScroll>
				<div className={wrapperClassNames}>
					{children}
				</div>
			</HorizontalScroll>
		</Group>

	)
}

FiltersCategoryGroup.propTypes = {
	label: PropTypes.string,
	isScrollable: PropTypes.bool,
	onElementClick: PropTypes.func,
	elements: PropTypes.array.isRequired,
	default: PropTypes.number
}

export default FiltersCategoryGroup;