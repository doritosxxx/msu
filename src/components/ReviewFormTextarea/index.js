import React from 'react'
import PropTypes from 'prop-types'
import { Textarea, Headline } from '@vkontakte/vkui';


function ReviewFormTextarea(props){
	return (<div className='review-form--textarea'>
			<Headline className='stars-range--title'>{props.title}</Headline>
			<Textarea 
				grow={false}
				rows={4}
				name={props.name}
			/>
		</div>);
}

ReviewFormTextarea.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
}

export default ReviewFormTextarea;