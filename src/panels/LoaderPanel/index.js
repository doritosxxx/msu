import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Spinner } from '@vkontakte/vkui'

export default class LoaderPanel extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	render() {
		return (
			<Panel id={this.props.id}>
				<div style={{
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}>
					<Spinner size='large'/>
				</div>
			</Panel>
		)
	}
}
