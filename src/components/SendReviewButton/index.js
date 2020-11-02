import React from 'react'
import PropTypes from 'prop-types'

import Icon28CommentOutline from '@vkontakte/icons/dist/28/comment_outline'
import Icon28PaperplaneOutline from '@vkontakte/icons/dist/28/paperplane_outline'

import './style.css'

const color = 'white'

function SendReviewButton(props){
	return (<div className='send-review-button' onClick={props.onClick}>
		<Icon28CommentOutline style={{color}}/>
	</div>);
}

SendReviewButton.propTypes = {
	//isModalOpened: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export default SendReviewButton;
