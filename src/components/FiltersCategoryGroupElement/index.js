import React from 'react'
import PropTypes from 'prop-types'


function FiltersCategoryGroupElement(props){

	return (<div className={props.isSelected ? "selected" : ""} onClick={props.onClick}>{props.label}</div>);
}

FiltersCategoryGroupElement.propTypes = {
	payload: PropTypes.any,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired,
}


export default FiltersCategoryGroupElement;