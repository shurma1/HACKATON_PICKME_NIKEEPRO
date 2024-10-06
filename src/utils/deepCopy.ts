export function deepCopy<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	
	if (Array.isArray(obj)) {
		const arrCopy = [];
		for (let i = 0; i < obj.length; i++) {
			arrCopy[i] = deepCopy(obj[i]);
		}
		//@ts-ignore
		return arrCopy;
	}
	
	const objCopy = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			//@ts-ignore
			objCopy[key] = deepCopy(obj[key]);
		}
	}
	//@ts-ignore
	return objCopy;
}
