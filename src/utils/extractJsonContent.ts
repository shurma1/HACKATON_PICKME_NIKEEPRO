export function extractJsonContent(input: string) {
	const startIndex = input.indexOf('{');
	const endIndex = input.lastIndexOf('}');
	if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
		return input.substring(startIndex, endIndex + 1);
	}
	return null;
}