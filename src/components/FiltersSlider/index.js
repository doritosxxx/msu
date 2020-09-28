import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from '@vkontakte/vkui'

export default class FiltersSelect extends React.Component{

	constructor(props){
		super()

		this.objectKey = props.objectKey
		this.state = {
			[this.objectKey]:props.default
		}
	}
	
	onChange(number, e){
		const state = { [this.objectKey]: number }
		this.setState( state )
		this.props.setFiltersState( state )

		console.log(this.state)
	}

	render(){
		
		return(
			<div>
				{this.props.top}
				<Slider 
					top={"пачиму не работает"}
					min={1}
					max={10}
					step={1}
					defaultValue={this.state[this.objectKey]}
					value={this.state[this.objectKey]}
					onChange={this.onChange.bind(this)}
				/>
			</div>
		)
	}
};