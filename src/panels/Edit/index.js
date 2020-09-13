import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from '@vkontakte/vkui'

import Header from '../../components/Header'

class Edit extends React.Component{

	constructor(props){
		super()
		
		this.id = props.id
	}

	render(){
		return (
			<Panel id={this.id}>
				<Header title='Тути ничего нет'/>
				Абсолютли
			</Panel>
		)
	}
}

export default Edit;