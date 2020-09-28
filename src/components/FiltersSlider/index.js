import React from 'react'
import PropTypes from 'prop-types'

import { RangeSlider, Div } from '@vkontakte/vkui'

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
	}

	render(){

		const range = this.state[this.objectKey]
		
		return(
			<div>
				<Div>
					{this.props.top} {range[0]}-{range[1]}
				</Div>
				<RangeSlider 
					//top="почему-то не работает"
					min={0}
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