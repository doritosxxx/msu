class Review {

	constructor(object = {}){
		this.id = object.id
		this.authorId = object.author_id ?? 0
		this.isAnonymous = object.is_anonymous ?? true
		this.creationTime_ts = object.create_ts ?? 0
		this.rating = {
            simplicity: object.score_simplicity ?? 3,
            kindness: object.score_kindness ?? 3,
            intelligibility: object.score_intelligibility ?? 3
		}
		this.comment = {
			positive: object.comment_good ?? '',
			negative: object.comment_bad ?? '',
			other: object.comment_other ?? ''
		}
	}

	get creationDate(){
		if(this.creationTime_ts === 0)
			return "Дата неизвестна"
		const date = new Date(this.creationTime_ts)
		const day = date.getUTCDate()
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
		][date.getUTCMonth()]
		const year = date.getUTCFullYear()
		const hours = date.getUTCHours().toString().padStart(2, '0')
		const minutes = date.getUTCMinutes().toString().padStart(2, '0')

		return `${day} ${month} ${year} в ${hours}:${minutes}`
	}

	_getformattedRating(key){
		if(this.rating[key] === undefined)
			throw new Error("Undefined teacher score key")
		
		const value = this.rating[key].toFixed(2)
		const sign = value > 0 ? '+' : ''

		return `${sign}${value}`;
	}

	get formattedSimplicity(){
		return this._getformattedRating('simplicity');
	}
	get formattedKindness(){
		return this._getformattedRating('kindness');
	}
	get formattedIntelligibility(){
		return this._getformattedRating('intelligibility');
	}

}

export default Review;