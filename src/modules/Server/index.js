import Review from "../../classes/Review";
import Teacher from "../../classes/Teacher"

const APIUrl = "https://sta.profcomff.com/api"
const APIVersion = "v1"

function HTTPBuildQuery(params) {
    if (typeof(params) != 'object')
        return "";
    return "?" + Object.entries(params)
        .map(pair => `${pair[0]}=${pair[1]}`)
        .join('&');
}

async function request(method, params) {
	// Настоятельно рекомендуется обработать исключения.
	const url = `${APIUrl}/${APIVersion}/${method}${HTTPBuildQuery(params)}`
    const response = await fetch(url)
    const rawObject = await response.json()
    return rawObject;
}

class Server {
	
    static async GetTeacherById(id) {
		try {
			const teacher = await request(`teacher/${id}`)
			return new Teacher(teacher);
		}
		catch {
			return new Teacher({});
		}
	}
	
	static async GetTeachersRange(offset, count = 20, orderBy = 'score_general'){
		try {
			const teachersList = await request('teacher', {
				offset: offset,
				limit: count,
				orderby: orderBy
			})
			return teachersList.map(teacher => new Teacher(teacher));
		}
		catch {
			return [];
		}
	}

	static async GetReviewsByTeacherId(teacherId){
		try {
			const reviewsList = await request(`teacher/${teacherId}/comment`, {
				teacher_id : teacherId
			})
			return reviewsList.map(review => new Review(review));
		}
		catch {
			return [];
		}
	}

	static async AddComment(data){
		// TODO: предположительно, тут должен быть api key.
		const { teacherId, userId, review } = data;
		const params = {
			author_id     : userId,
			comment_good  : review.comment.positive,
			comment_bad   : review.comment.negative,
			comment_other : review.comment.other,
			score_simplicity   : review.rating.simplicity,
			score_kindness   : review.rating.kindness,
			score_intelligibility   : review.rating.intelligibility,
		}
		
		try {
			await request(`teacher/${teacherId}/comment`, params);
			return true;
		}
		catch{
			return false;
		}
	}

}

export default Server;