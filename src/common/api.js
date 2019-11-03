import service from './http'

export function getSixRank() {
	return service.get('/api/lib/six/user.json')
}

export function getSixCard() {
	return service.get('/api/lib/six/card.json')
}

export function getFiveRank() {
	return service.get('/api/lib/five/userData.json')
}

export function getFiveBirthday() {
	return service.get('/api/lib/five/birthday.json')
}

export function getWeek() {
	return service.get('/api/week/data.json')
}
export function getDataView() {
	return service.get('/api/week/dataView.json')
}
export function getDataWeek() {
	return service.get('/api/week/dataWeek.json')
}
// 鸡汤接口
export function soups() {
	let date1 = new Date();
	let date2 = new Date(date1);
	date2.setDate(date1.getDate() - 29);
	let start = {
		year: date2.getFullYear().toString(),
		month: ((date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1)).toString(),
		date: (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()).toString()
	}
	let startTime = start.year + start.month + start.date
	let end = {
		year: date1.getFullYear().toString(),
		month: ((date1.getMonth() + 1) < 10 ? '0' + (date1.getMonth() + 1) : (date1.getMonth() + 1)).toString(),
		date: (date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate()).toString()
	}
	let endTime = end.year + end.month + end.date
	return service.get("http://api.fenfenriji.com/activity/wisdoms?start=" + startTime + "&end=" + endTime)
}

// 口袋敏感字
export function koudai(cont) {
	return service.get('http://ban2.lovelyctx.com/api', { params: { 'content': cont } })
}