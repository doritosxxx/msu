import { PopoutWrapper, ScreenSpinner } from '@vkontakte/vkui'
import React from 'react'

import './style.css'

function MainLoadingPopout(){
	return (
		<PopoutWrapper 
			className="popout--main"
		>
			<ScreenSpinner size="large" />
		</PopoutWrapper>
	);
}

export default(MainLoadingPopout);