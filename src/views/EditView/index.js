import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';

import EditPanel from '../../panels/EditPanel'


class EditView extends React.Component{

	render(){
		return (
			<View id={this.props.id} activePanel="edit">
				<EditPanel id='edit'/>  
			</View>
		)
	}
}


export default EditView;