export interface IGoggleSearch {
	searchInformation: {
		searchTime: number,
		formattedSearchTime: string, //num in string
		totalResults: string, //num in string
		formattedTotalResults: string
	},
	items: IGoogleSearchItem[]
}

export interface IGoogleSearchItem {
	kind: string, //ненужная хуйня
	title: string,
	htmlTitle: string,
	link: string,
	displayLink: string // example: www.instagram.com,
	snippet: string, // example: Aug 19, 2024 ... My little woolen sock ... Photo by british kittens котята британц on October 01, 2024. May be an.
	htmlSnippet: string,
	formattedUrl: string, // example: https://www.instagram.com/plushevy_kot/p/C-21YcTK9Nl/
	htmlFormattedUrl:  string, // example: https://www.instagram.com/plushevy_kot/p/C-21YcTK9Nl/
}