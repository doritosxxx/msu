import ReviewData from './ReviewData'

class Review extends ReviewData {

	constructor(object = {}){
		super(object)
		this.id = object.id
		this.authorId = object.author_id ?? 0
		this.creationTime_ts = 1000 * +(object.create_ts ?? 0)
	}

	get creationDate(){
		if(this.creationTime_ts === 0)
			return "Дата неизвестна"
		const date = new Date(this.creationTime_ts)
		const day = date.getDate()
		const month = [
			'янв',
			'фев',
			'мар',
			'апр',
			'май',
			'июн',
			'июл',
			'авг',
			'сен',
			'окн',
			'ноя',
			'дек'			
		][date.getMonth()]
		const year = date.getFullYear()
		const hours = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')

		return `${day} ${month} ${year} в ${hours}:${minutes}`
	}
}

export default Review;