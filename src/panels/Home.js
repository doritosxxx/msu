import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
//import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import Logo from '../components/Logo'
import Teacher from '../components/Teacher'

import teachers_list from '../temporary_list.js'

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>
			{/* TODO: убрать хардкод. Возможно, необходимо сделать компонент (2)Header */}
			<div style={{
				display: 'flex',
				alignItems: 'center'
			}}> 
				<Logo />
				<div style={{
					marginLeft:"13px"
				}}> 
					Преподаватели
				</div>
			</div>
		</PanelHeader>

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
