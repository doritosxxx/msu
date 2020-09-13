import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

import Logo from '../../components/Logo'

class Edit extends React.Component{

	constructor(props){
		super()
		
		this.id = props.id
	}

	render(){
		return (
			<Panel id={this.id}>
				<PanelHeader>
					{/* TODO: убрать хардкод. 100% необходимо сделать компонент (2)Header */}
					<div style={{
						display: 'flex',
						alignItems: 'center'
					}}> 
						<Logo />
						<div style={{
							marginLeft:"13px"
						}}> 
							Ничего нет тут
						</div>
					</div>
				</PanelHeader>
				Абсолютли
			</Panel>
		)
	}
}

export default Edit;