import React from 'react'
import { Panel, PanelHeader } from '@vkontakte/vkui'

import Header from '../../components/Header'

class Edit extends React.Component{

	constructor(props){
		super()
		
		this.id = props.id
	}

	render(){
		return (
			
			<Panel id={this.id}>
				<PanelHeader>
					<Header title='Тут ничего нет'/>
				</PanelHeader>
				Абсолютли
			</Panel>
		)
	}
}

export default Edit;