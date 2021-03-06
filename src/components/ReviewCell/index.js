import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Cell, Div, Headline, Subhead, Text } from '@vkontakte/vkui'
import Rating from '../Rating'

class ReviewCell extends React.Component{

	constructor(props){
		super(props)
		this.review = props.review
	}

	render(){

		const review = this.review

		// Тут бы по-хорошему все раскидать по компонентам, но я делаю MVP.
		return (
			<Div>
				<Cell
					size='l'
					before={<Avatar size={48} src={ review.isAnonymous ? '/img/teacher_blank.jpg' : '/img/teacher_blank.jpg' }/>}
					description={review.creationDate}
					
				>
					<Headline weight='semibold' style={{fontSize:'120%'}}>
						{ review.isAnonymous ? 'Анонимно' : `id автора ${review.authorID}. Сори имени не знаю` }
					</Headline>
				</Cell>
				<Rating rating={{
						simplicity: this.review.formattedSimplicity,
						kindness: this.review.formattedKindness,
						intelligibility: this.review.formattedIntelligibility 
					}}/>
				{review.comment.positive.length > 0 && 
					<div>
						<Subhead weight='semibold'>Плюсы:</Subhead>
						<Text>{review.comment.positive}</Text>
					</div>}
				{review.comment.negative.length > 0 && 
					<div>
						<Subhead weight='semibold'>Минусы:</Subhead>
						<Text>{review.comment.negative}</Text>
					</div>}
				{review.comment.other.length > 0 && 
					<div>
						<Subhead weight='semibold'>Дополнительно:</Subhead>
						<Text>{review.comment.other}</Text>
					</div>}			
			</Div>
		)
	}
}

ReviewCell.propTypes = {
	review: PropTypes.object.isRequired
}

export default ReviewCell;