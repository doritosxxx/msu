import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Headline } from '@vkontakte/vkui'

import './style.css'
import Star from '../Star';

function ReviewFormStarsRange(props){

	const [value, setValue] = useState(3)

	return (
		<div className='review-form--stars-range'>
			<Headline className='stars-range--title'>{props.title}</Headline>
			<div style={{
				display:'flex',
				justifyContent:'center'
			}}>
				<div className='stars-range--content-wrapper'>
					<div className='stars-range--text stars-range--text__before'>{props.before}</div>
					<div className='stars-range--stars-container'>
						{[1,2,3,4,5].map(e=><Star 
							key={e}
							isFilled={ e <= value}
							onClick={()=>setValue(e)}
						/>)}
					</div>
					<div className='stars-range--text stars-range--text__after'>{props.after}</div>
				</div>
			</div>
			
		</div>

	);
}

ReviewFormStarsRange.propTypes = {
	title: PropTypes.string.isRequired,
	before: PropTypes.string,
	after: PropTypes.string
}

export default ReviewFormStarsRange;