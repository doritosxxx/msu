import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup, Button} from '@vkontakte/vkui';
import { usePlatform , ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'

import ReviewFormStarsRange from '../../components/ReviewFormStarsRange'
import ReviewFormTextarea from '../../components/ReviewFormTextarea'

import './style.css'
import Server from '../../modules/Server';
import { withRoute } from 'react-router5';

function ReviewModal(props) {

	const review = useRef(props.review)

	const serializeFormData = () => {
		return {
			comment: {
				positive: document.querySelector("[name=comment_positive]").value ?? "",
				negative: document.querySelector("[name=comment_negative]").value ?? "",
				other: document.querySelector("[name=comment_other]").value ?? ""
			},
			rating: {
				simplicity: +document.querySelector("[name=score_simplicity]").dataset.value,
				kindness: +document.querySelector("[name=score_kindness]").dataset.value,
				intelligibility: +document.querySelector("[name=score_intelligibility]").dataset.value
			}
		};
	}

	useEffect(()=>{
		return function(){
			const serializedData = serializeFormData()
			review.current.comment = serializedData.comment
			review.current.rating = serializedData.rating
		}

	})

	function onSubmit(e){
		console.log(e)
		
		e.preventDefault()
		// TODO добавить лоадер и обработку ошибок.

		(async ()=>{
			const teacherId = props.route.params.id ?? null

			if(teacherId == null || props.user == null)
				return;
			let success = await Server.AddComment({
				teacherId: teacherId,
				userId: props.user.id,
				review: serializeFormData()
			})

			console.log(success)
		})()
		
	}


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
		<FormLayout className='review-form' onSubmit={onSubmit}>
			<FormLayoutGroup>
				<ReviewFormStarsRange
					title='Халявность'
					before='Очень просто'
					after='Очень сложно'
					name='score_simplicity'
					defaultValue={review.current.rating.simplicity}
				/>
				<ReviewFormStarsRange
					title='Понятность'
					before='Ничего не понятно'
					after='Объясняет доходчиво'
					name='score_intelligibility'
					defaultValue={review.current.rating.intelligibility}
				/>
				<ReviewFormStarsRange
					title='Доброта'
					before='Злой'
					after='Добрый'
					name='score_kindness'
					defaultValue={review.current.rating.kindness}
				/>
			</FormLayoutGroup>
			<FormLayoutGroup>
				<ReviewFormTextarea
					title='Положительные стороны'
					name='comment_positive'
					defaultValue={review.current.comment.positive}
				/>
				<ReviewFormTextarea
					title='Отрицательные стороны'
					name='comment_negative'
					defaultValue={review.current.comment.negative}
				/>
				<ReviewFormTextarea
					title='Комментарии'
					name='comment_other'
					defaultValue={review.current.comment.other}
				/>
			</FormLayoutGroup>
			<div style={{
				display:'flex',
				justifyContent:'center'
			}}>
				<Button >Оставить комментарий</Button>
			</div>
		</FormLayout>
		</ModalPage>
	)
	
}

ReviewModal.propTypes = {
	id: PropTypes.string.isRequired,
	hide: PropTypes.func,
	review: PropTypes.object.isRequired
}

export default withRoute(ReviewModal);