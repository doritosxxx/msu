import Review from "../../classes/Review";
import Teacher from "../../classes/Teacher"

const APIUrl = "https://sta.profcomff.com/api"
const APIVersion = "v1"

function HTTPBuildQuery(params) {
    if (typeof(params) != 'object')
		return "";
	const entries = Object.entries(params)
	if(entries.length === 0)
		return "";
    return "?" + entries
        .map(pair => `${pair[0]}=${pair[1]}`)
        .join('&');
}

async function request(method, params, options={}) {
	const url = `${APIUrl}/${APIVersion}/${method}${HTTPBuildQuery(params)}`
    const response = await fetch(url, options)
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
			const reviewsList = await request(`teacher/${teacherId}/comment`)
			return reviewsList.map(review => new Review(review));
		}
		catch {
			return [];
		}
	}

	static async AddComment(data){
		const { teacherId, userId, review } = data;
		const body = {
			author_id     : userId,
			comment_good  : review.comment.positive,
			comment_bad   : review.comment.negative,
			comment_other : review.comment.other,
			score_simplicity   : review.rating.simplicity,
			score_kindness   : review.rating.kindness,
			score_intelligibility   : review.rating.intelligibility,
			anonymous : review.isAnonymous,
			subjects : []
		}
		try {
			await request(`teacher/${teacherId}/comment`, {}, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(body)
			});
			return true;
		}
		catch {
			return false;
		}
	}

}

export default Server;