class Review{

	constructor(object){
		this.authorId = object.author_id ?? 0
		this.isAnonymous = object.is_anonymous ?? true
		this.creationTime_ts = object.create_ts ?? 0
		this.rating = {
            simplicity: object.simplicity_score ?? 0,
            kindness: object.kindness_score ?? 0,
            intelligibility: object.intelligibility_score ?? 0
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

export default Review;