export const omitUndefined = (obj: any) => {
	Object.keys(obj).forEach(key => {
		if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			omitUndefined(obj[key]);
		} else if (obj[key] === undefined || obj[key] === null || obj[key] === 'null' || obj[key] === 'undefined' || obj[key] === '') {
			delete obj[key];
		}
	});
	return obj;
};
