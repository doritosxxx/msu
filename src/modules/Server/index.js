import Review from "../../classes/Review";
import Teacher from "../../classes/Teacher"

const APIUrl = "https://sta.profcomff.com/"

function HTTPBuildQuery(params) {
    if (typeof(params) != 'object')
        return "";
    return "?" + Object.entries(params)
        .map(pair => `${pair[0]}=${pair[1]}`)
        .join('&');
}

async function request(method, params) {
    // Настоятельно рекомендуется обработать исключения.
    const response = await fetch(`${APIUrl}${method}${HTTPBuildQuery(params)}`)
    const rawObject = await response.json()

    return rawObject;
}

class Server {
    static async GetTeacherById(id) {
        const teacher = await request('teacher.get', { id })
        return new Teacher(teacher);
	}
	
	static async GetTeacherRange(offset, count = 20){
		const teachersList = await request('teacher.get_all', {
			offset: offset,
			top: count
		})
		return teachersList.map(teacher => new Teacher(teacher))
	}

	static async GetReview(){
		return new Review({});
	}

}

export default Server;