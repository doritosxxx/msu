import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@vkontakte/vkui'

function AvatarStretched(props){
	
	return (<Avatar {...props} className="avatar-stretched" style={{
		objectFit:"cover",
		minWidth: "100%"
	}}/>)
}

AvatarStretched.propTypes = {
	src: PropTypes.string,
	size: PropTypes.number,
}

export default AvatarStretched;