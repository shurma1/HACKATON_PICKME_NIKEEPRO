export const calcPercentBetween = (start: number, end: number, percent: number) => {
	if(start > end) {
		return start + (end - start) * percent;
	}
	
	if(start < end) {
		return start - (start - end) * percent;
	}
	
	return start
}