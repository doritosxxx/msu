import React from 'react'
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup, Button} from '@vkontakte/vkui';
import { usePlatform , ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'

import ReviewFormStarsRange from '../../components/ReviewFormStarsRange'
import ReviewFormTextarea from '../../components/ReviewFormTextarea'

import './style.css'

function ReviewModal(props) {
	
	return (
		<ModalPage
			id={props.id}
			header={
				<ModalPageHeader
					left={
						usePlatform() === ANDROID 
						&& <PanelHeaderButton onClick={props.hide}>
							<Icon24Cancel/>
						</PanelHeaderButton>
					}
					right={
					<PanelHeaderButton onClick={props.hide}>
						{usePlatform() === IOS ? 'Готово' : <Icon24Done />}
					</PanelHeaderButton>}
				>
					Оставить комментарий
				</ModalPageHeader>
			}
		>
		<FormLayout className='review-form'>
			<FormLayoutGroup>
				<ReviewFormStarsRange
					title='Халявность'
					before='Очень просто'
					after='Очень сложно'
				/>
				<ReviewFormStarsRange
					title='Понятность'
					before='Ничего не понятно'
					after='Объясняет доходчиво'
				/>
				<ReviewFormStarsRange
					title='Доброта'
					before='Злой'
					after='Добрый'
				/>
			</FormLayoutGroup>
			<FormLayoutGroup>
				<ReviewFormTextarea
					title='Положительные стороны'
					name='comment_positive'
				/>
				<ReviewFormTextarea
					title='Отрицательные стороны'
					name='comment_negative'
				/>
				<ReviewFormTextarea
					title='Комментарии'
					name='comment_other'
				/>
				
			</FormLayoutGroup>
			<div style={{
				display:'flex',
				justifyContent:'center'
			}}>
				<Button>Оставить комментарий</Button>
			</div>
		</FormLayout>
		</ModalPage>
	)
	
}

ReviewModal.propTypes = {
	
}


export default ReviewModal;