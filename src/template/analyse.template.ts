import {IDeepTextAnalyse} from "../types/IDeepTextAnalyse";

export const analyseTemplate = (data: IDeepTextAnalyse) => {
	return `
		Эта новость достоверна на <b>${data.trustСoeff.toFixed(2)}%</b>\n\n
		${data.sentences.map((sentence, i) => {
			return `${i + 1}) [${sentence.chance.toFixed(2)}%]- <u>${sentence.sentence}</u> \n <b>Источники</b>: \n
				${sentence.resources.map((resource) => {
					return `- [${resource.trustСoeff.toFixed(2)}%]- <u><a href="${resource.uri}">${resource.title}</a></u>\n`;
				}).join(' ')}
			`
		}).join(' ')}
	`
}
