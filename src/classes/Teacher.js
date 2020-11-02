import Marked from 'marked'
import DOMPurify from 'dompurify'

class Teacher {

    constructor(object) {
        this.id = +object.id
		this.image = object.photo_link ?? "/img/teacher_blank.jpg"
		this.additionalInfo = this._markdown(object.additional ?? '')
        this.firstName = object.firstname ?? ''
        this.middleName = object.middlename ?? ''
		this.lastName = object.lastname ?? ''
		this.facultyId = object.faculty ?? null
		this.departmentId = object.department ?? null
		this.subjectsIdList = object.subjectsIdList ?? []
        this.rating = {
            general: object.general_score ?? 0,
            simplicity: object.simplicity_score ?? 0,
            kindness: object.kindness_score ?? 0,
            intelligibility: object.intelligibility_score ?? 0
        }
    }

    get fullName() {
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
	}

	_markdown(data){
		return Marked.parse(DOMPurify.sanitize(data))
	}
	
	_getformattedRating(key){
		if(this.rating[key] === undefined)
			throw new Error("Undefined teacher score key")
		
		const value = this.rating[key].toFixed(2)
		const sign = value > 0 ? '+' : ''

		return `${sign}${value}`;
	}

	get formattedGeneral(){
		return this._getformattedRating('general');
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

export default Teacher;