import React from 'react'
import PropTypes from 'prop-types'

import { Search } from '@vkontakte/vkui'

import Icon24Filter from '@vkontakte/icons/dist/24/filter';

class CustomSearch extends React.Component{

	constructor () {
		super()

	}
  
	render(){
		return(
			<Search
              //value={this.state.search}
              onChange={this.props.onSearchChange}
              icon={<Icon24Filter />}
              onIconClick={this.props.onFiltersClick}
            />
		)
	}
}

export default CustomSearch;