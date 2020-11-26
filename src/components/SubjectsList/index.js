import React from 'react'
import PropTypes from 'prop-types'


import './style.css'

function SubjectsList(props){

	const defaultMessage = props.defaultMessage ?? 'Пустой список'

	function getList(list){
		return list.length === 0 ? [{
			id:0,
			name: defaultMessage
		}] : list;
	}


	return (<div className="subjects-list">
		{getList(props.subjects).map(e=><span key={e.id} className="subjects-list__item">{e.name}</span>)}
	</div>);
}

SubjectsList.propTypes = {
	subjects: PropTypes.array.isRequired,
	defaultMessage: PropTypes.string,
}

export default SubjectsList;