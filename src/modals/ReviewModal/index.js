import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup, Button, Spinner, Checkbox} from '@vkontakte/vkui';
import { usePlatform , ANDROID, IOS } from '@vkontakte/vkui'
import { Icon24Cancel, Icon24ErrorCircle, Icon24CheckCircleOn } from '@vkontakte/icons'

import ReviewFormStarsRange from '../../components/ReviewFormStarsRange'
import ReviewFormTextarea from '../../components/ReviewFormTextarea'

import './style.css'
import Server from '../../modules/Server';
import { withRoute } from 'react-router5';

function ReviewModal(props) {

	console.log(props.user)

	const review = useRef(props.review)

	const [isSubmitEventRunning, setIsSubmitEventRunning] = useState(false)

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
			},
			isAnonymous : document.querySelector("[name=is_anonymous]").checked
		};
	}

	useEffect(()=>{
		return function(){
			const serializedData = serializeFormData()
			review.current.comment = serializedData.comment
			review.current.rating = serializedData.rating
			review.current.isAnonymous = serializedData.isAnonymous
		}

	})

	function showBox(message, icon){
		props.setSnackbar(message, icon)
	}

	function showErrorBox(errorMessage){
		showBox(errorMessage, <Icon24ErrorCircle fill="#a00" />)
	}

	function showSuccessBox(successMessage){
		showBox(successMessage, <Icon24CheckCircleOn fill="#0a0" />)
	}

	async function onSubmit(e){
		e.preventDefault()

		if(isSubmitEventRunning)
			return;
		setIsSubmitEventRunning(true)

		const teacherId = props.route.params.id ?? null

		if(!teacherId || !props.user){
			showErrorBox("Не удалось определить id пользователя.")
			// Да, это повторяющийся код.
			props.hide()
			setIsSubmitEventRunning(false)
			return;
		}

		let success = await Server.AddComment({
			teacherId: teacherId,
			userId: props.user.id,
			review: serializeFormData()
		})
		
		if (success) {
			showSuccessBox("Комментарий добавлен")
		}
		else {
			showErrorBox("Не удалось соединиться с сервером")
		}
		props.hide()
		setIsSubmitEventRunning(false)
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
						{usePlatform() === IOS ? 'Закрыть' : <Icon24Cancel/>}
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
			<Checkbox name="is_anonymous">Отправить анонимно</Checkbox>
			<div style={{
				display:'flex',
				justifyContent:'center'
			}}>
				{!isSubmitEventRunning ? (<Button>Оставить комментарий</Button>) : <Spinner size="medium"/>}
			</div>
		</FormLayout>
		</ModalPage>
	)
	
}

ReviewModal.propTypes = {
	id: PropTypes.string.isRequired,
	hide: PropTypes.func,
	review: PropTypes.object.isRequired,
	setSnackbar: PropTypes.func.isRequired,
	user: PropTypes.object
}

export default withRoute(ReviewModal);