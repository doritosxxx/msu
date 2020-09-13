import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Teacher from '../components/Teacher'
import Header  from '../components/Header';

import teachers_list from '../temporary_list.js'

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<Header title='Преподаватели'></Header>
		<Group title="Teacher list">
			<List>
				{teachers_list.map(teacher => <Teacher teacher={teacher}/>)}
			</List>
			
		</Group>
		{/*
		<Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>
		*/}
	</Panel>
);
/*
Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};
*/
export default Home;
