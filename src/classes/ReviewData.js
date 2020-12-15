class ReviewData {
	constructor(object={}){
		this.isAnonymous = !!(object.is_anonymous ?? true)
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

export default ReviewData;