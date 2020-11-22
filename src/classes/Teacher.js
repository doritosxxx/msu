import Marked from 'marked'
import DOMPurify from 'dompurify'

class Teacher {

    constructor(object) {
		this.id = +(object.id ?? -1)
		this.image = object.photo ?? "/img/teacher_blank.jpg"
		this.additionalInfo = this._markdown(object.additional ?? '')
        this.firstName = object.first_name ?? ''
        this.middleName = object.middle_name ?? ''
		this.lastName = object.last_name ?? ''
		this.facultyId = object.faculty ?? null
		this.facultyName = object.faculty_name ?? "Факультет не указан"
		this.departments = object.departments ?? []
		this.subjects = object.subjects ?? []
        this.rating = {
            general: object.score_general ?? 0,
            simplicity: object.score_simplicity ?? 0,
            kindness: object.score_kindness ?? 0,
            intelligibility: object.score_intelligibility ?? 0
        }
	}
	
	exists(){
		return this.id !== -1;
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