import OpenaiService from "./openai.service";
import {
	textAnalysisPromt,
	resultRelevancePromt
} from "../constants/prompts";
import {ISentences} from "../types/ISentences";
import SearchService from "./search.service";
import {ISentenceWithAnalysis} from "../types/ISentenceWithAnalysis";
import {IRelevances} from "../types/IRelevances";
import {extractJsonContent} from "../utils/extractJsonContent";
import {
	BLACK_LIST_COEFF, MIN_RELEVANCE_AVAILABLE,
	MIN_RESOURCE_QUALITY,
	RELEVANT_SEARCH_COEFF,
	RESOURCE_QUALITY, RESULTS_MAY_DELETE,
	WHITE_LIST_COEFF
} from "../constants/constants";
import TrustService from "./trust.service";
import {IResource} from "../types/IResource";
import {BOOLEAN} from "sequelize";
import {calcPercentBetween} from "../utils/calcPercentBetween";
import {IDeepTextAnalyse} from "../types/IDeepTextAnalyse";



class AnalysisService {
	public async TextToEssence(text: string): Promise<ISentences>{
		try {
			const answer = await OpenaiService.GenerateGPT4oMini(textAnalysisPromt + text);
			return JSON.parse(extractJsonContent(answer) as string);
		} catch (error) {
			throw error;
		}
	}
	
	public async RelevanceOfSearchResults(query: string, results: string[]): Promise<IRelevances> {
		try {
			const answer = await OpenaiService.GenerateGPT4oMini(resultRelevancePromt + `{query: ${query}, results: [${results.join(', ')}]`);
			
			return JSON.parse(extractJsonContent(answer) as string);
		} catch (error) {
			throw error;
		}
	}
	
	public async DeepTextAnalysis(text: string, trust: number, logic: number, resourceQuality: number): Promise<IDeepTextAnalyse> {
		try{
			const essence = await this.TextToEssence(text);
			console.log('params', trust, logic, resourceQuality)
			const sentenceWithAnalysis = await Promise.all(essence.sentences.map(async sentence => {
				const searchResult = await SearchService.Search(sentence.brief);
				
				const sentenceWithAnalysis: ISentenceWithAnalysis = {
					...sentence,
					totalPages: parseInt(searchResult.searchInformation.totalResults),
					resources: await Promise.all(searchResult.items.map(async item => {
						
						let trustСoeff = 0;
						let yaIndex = await SearchService.GetWebQualityIndex(item.displayLink);
						console.log('ya index', yaIndex, item.displayLink)
						for (let i = 0; i < RESOURCE_QUALITY.length - 1; i++) {
							if (yaIndex >= RESOURCE_QUALITY[i] && yaIndex < RESOURCE_QUALITY[i + 1]) {
								const rangeStart = RESOURCE_QUALITY[i];
								const rangeEnd = RESOURCE_QUALITY[i + 1];
								const rangeFraction = (yaIndex - rangeStart) / (rangeEnd - rangeStart);
								trustСoeff = calcPercentBetween(1, (i + rangeFraction) / (RESOURCE_QUALITY.length - 1), resourceQuality);
								break;
							}
						}
						
						if (yaIndex >= RESOURCE_QUALITY[RESOURCE_QUALITY.length - 1]) {
							trustСoeff = 1;
						}
						
						const trustStatus = TrustService.CheckDomain(item.displayLink);
						
						if(trustStatus === -1) {
							trustСoeff -= (1 - trustСoeff) * BLACK_LIST_COEFF * trust;
							if(trustСoeff < 0) trustСoeff = 0;
						}
						
						if(trustStatus === 1) {
							trustСoeff += trustСoeff* WHITE_LIST_COEFF * trust;
							if(trustСoeff > 1) trustСoeff = 1;
						}
						
						return {
							url: item.displayLink,
							uri: item.formattedUrl,
							title: item.title,
							snippet: item.snippet,
							trustСoeff
						}
					}))
				}
				
				return sentenceWithAnalysis;
			}));
			
			for(let i in sentenceWithAnalysis) {
				const sentence = sentenceWithAnalysis[i];
				const resourcesCount = sentence.resources.length;
				
				const resultContexts = sentence.resources.map(resource => resource.title + ' ' + resource.snippet)
				const relevances = await this.RelevanceOfSearchResults(sentence.brief, resultContexts);
				
				let relevanceCoeff = 0;
				
				const trustResources: IResource[] = [];
				const badResources: IResource[] = [];
				
				relevances.relevances.forEach((coeff, i) => {
					
					relevanceCoeff += RELEVANT_SEARCH_COEFF;
					sentence.resources[i].trustСoeff *= coeff / 100; //****
					if(coeff < RELEVANT_SEARCH_COEFF * trust) {
						//@ts-ignore
						sentence.resources[i] = null;
					}
					
					if(sentence.resources[i] !== null) {
						if(sentence.resources[i].trustСoeff > MIN_RESOURCE_QUALITY) {
							trustResources.push(sentence.resources[i]);
						}
						else {
							badResources.push(sentence.resources[i]);
						}
					}
				})
				relevanceCoeff /= resourcesCount;
				sentence.resources = sentence.resources.filter(BOOLEAN);
				
				const resourceCountAfterFilter = sentence.resources.length;
				
				const resourceFilteredCoeff = 1 - (resourceCountAfterFilter / resourcesCount);
				
				const middleTrustResourceIndex = trustResources.length !== 0
					? trustResources.reduce((total, item) => {
					return total + item.trustСoeff;
				}, 0) / trustResources.length
					: 0;
				
				const middleBadResourceIndex = badResources.length !== 0
					? badResources.reduce((total, item) => {
					return total + item.trustСoeff;
				}, 0) / badResources.length
					: 0;
				console.log(sentenceWithAnalysis[i].chance)
				sentenceWithAnalysis[i].chance = calcPercentBetween(sentenceWithAnalysis[i].chance, 1, logic);
				console.log(sentenceWithAnalysis[i].chance, middleTrustResourceIndex, resourceFilteredCoeff, relevanceCoeff)
				sentenceWithAnalysis[i].chance *= middleTrustResourceIndex * (resourceFilteredCoeff > RESULTS_MAY_DELETE ? 0.8 : 1 ) * (relevanceCoeff < MIN_RELEVANCE_AVAILABLE ? 0.8 : 1 )
			}
			return {
				text,
				trustСoeff: sentenceWithAnalysis.reduce((total, sentence) => total += sentence.chance, 0) / sentenceWithAnalysis.length,
				sentences: sentenceWithAnalysis
			};
			
		}
		catch (error) {
			throw error;
		}
	}
}

export default new AnalysisService();