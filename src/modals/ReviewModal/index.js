import React from 'react'
import PropTypes from 'prop-types'

import { ModalPage, PanelHeaderButton, ModalPageHeader, FormLayout, FormLayoutGroup, Button, Spinner, Checkbox, withPlatform} from '@vkontakte/vkui';
import { IOS } from '@vkontakte/vkui'
import { Icon24Cancel } from '@vkontakte/icons'

import { ReviewFormStarsRange, ReviewFormTextarea } from '../../components'

import './style.css'

class ReviewModal extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			isSubmitEventRunning: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	async onSubmit(e){
		e.preventDefault()
		console.log(this.props.review)

		if(this.state.isSubmitEventRunning)
			return;
		this.setState({isSubmitEventRunning: true})

		await this.props.submitComment()
		
		this.props.hide()
		this.setState({isSubmitEventRunning: false})

	}

	render(){
		// TODO: Повторяющийся код с defaultValue и onChange
		return (
			<ModalPage
				id={this.props.id}
				header={
					<ModalPageHeader
						right={
						<PanelHeaderButton onClick={this.props.hide}>
							{this.props.platform === IOS ? 'Закрыть' : <Icon24Cancel/>}
						</PanelHeaderButton>}
					>
						Оставить комментарий
					</ModalPageHeader>
				}
			>
			<FormLayout className='review-form' onSubmit={this.onSubmit}>
				<FormLayoutGroup>
					<ReviewFormStarsRange
						title='Халявность'
						before='Очень просто'
						after='Очень сложно'
						defaultValue={this.props.review.rating.simplicity}
						onChange={(value)=>{
							const review = this.props.review
							review.rating.simplicity = value
							this.props.setReview(review)
						}}
					/>
					<ReviewFormStarsRange
						title='Понятность'
						before='Ничего не понятно'
						after='Объясняет доходчиво'
						defaultValue={this.props.review.rating.intelligibility}
						onChange={(value)=>{
							const review = this.props.review
							review.rating.intelligibility = value
							this.props.setReview(review)
						}}
					/>
					<ReviewFormStarsRange
						title='Доброта'
						before='Злой'
						after='Добрый'
						defaultValue={this.props.review.rating.kindness}
						onChange={(value)=>{
							const review = this.props.review
							review.rating.kindness = value
							this.props.setReview(review)
						}}
					/>
				</FormLayoutGroup>
				<FormLayoutGroup>
					<ReviewFormTextarea
						title='Положительные стороны'
						defaultValue={this.props.review.comment.positive}
						onChange={(e)=>{
							const review = this.props.review
							review.comment.positive = e.currentTarget.value
							this.props.setReview(review)
						}}
					/>
					<ReviewFormTextarea
						title='Отрицательные стороны'
						defaultValue={this.props.review.comment.negative}
						onChange={(e)=>{
							const review = this.props.review
							review.comment.negative = e.currentTarget.value
							this.props.setReview(review)
						}}
					/>
					<ReviewFormTextarea
						title='Комментарии'
						defaultValue={this.props.review.comment.other}
						onChange={(e)=>{
							const review = this.props.review
							review.comment.other = e.currentTarget.value
							this.props.setReview(review)
						}}
					/>
				</FormLayoutGroup>
				<Checkbox 
					defaultChecked={this.props.review.isAnonymous}
					onChange={(e)=>{
						const review = this.props.review
						review.isAnonymous = e.currentTarget.checked
						this.props.setReview(review)
					}}
				>Отправить анонимно</Checkbox>
				<div style={{
					display:'flex',
					justifyContent:'center'
				}}>
					{!this.state.isSubmitEventRunning ? (<Button>Оставить комментарий</Button>) : <Spinner size="medium"/>}
				</div>
			</FormLayout>
			</ModalPage>
		)
	}
}

ReviewModal.propTypes = {	
	id: PropTypes.string.isRequired,
	hide: PropTypes.func.isRequired,
	review: PropTypes.object.isRequired,
	setSnackbar: PropTypes.func.isRequired,
	submitComment: PropTypes.func.isRequired,
	setReview: PropTypes.func.isRequired,
}

export default withPlatform(ReviewModal);