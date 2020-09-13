import React from 'react'
import PropTypes from 'prop-types'

import { Panel, Button, Group, List, Div } from '@vkontakte/vkui'

import TeacherCell from '../../components/TeacherCell'
import Header  from '../../components/Header'

import teachers_list from '../../temporary_list.js'
import Teacher from '../../classes/Teacher'

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<Header title='Преподаватели'></Header>
		<Group title="Teacher list">
			<List>
				{/* TODO: переписать эту длинную строчку */}
				{teachers_list.map(teacher => <TeacherCell teacher={new Teacher(teacher)}/>)}
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
