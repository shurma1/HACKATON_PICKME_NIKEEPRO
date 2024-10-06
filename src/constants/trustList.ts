
interface ITrustList {
	whiteList: string[],
	blackList: string[]
}

export const trustList: ITrustList = {
	whiteList: [
		'www.mid.ru'
	],
	blackList: [
		'*.uk',
		'*.uk.*',
		'nato.*',
		'uscis.gov',
		'bbc.*',
		'youtube.com'
	]
}