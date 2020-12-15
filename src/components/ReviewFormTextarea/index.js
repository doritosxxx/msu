import React from 'react'
import PropTypes from 'prop-types'
import { Textarea, Headline } from '@vkontakte/vkui';


function ReviewFormTextarea(props){
	return (<div className='review-form--textarea'>
			<Headline className='stars-range--title'>{props.title}</Headline>
			<Textarea 
				grow={false}
				rows={4}
				defaultValue={props.defaultValue}
				onChange={(e)=>props.onChange(e)}
			/>
		</div>);
}

ReviewFormTextarea.propTypes = {
	title: PropTypes.string,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
}

export default ReviewFormTextarea;