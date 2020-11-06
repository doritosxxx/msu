import React from 'react'
import PropTypes from 'prop-types'

import { Search } from '@vkontakte/vkui'
import {Icon24Filter} from '@vkontakte/icons'

class CustomSearch extends React.Component{

  
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

CustomSearch.propTypes = {
	onChange: PropTypes.func,
	onIconClick: PropTypes.func
}

export default CustomSearch;