import {API_ANALYSIS_PARAMS, API_URL} from "../config";
import axios from "axios";
import {IDeepTextAnalyse} from "../types/IDeepTextAnalyse";

export default class CheckTextService {
	static async Check(text: string): Promise<IDeepTextAnalyse> {
		return await axios.post(
			API_URL + '/reliability/check',
			{
				text,
				...API_ANALYSIS_PARAMS
			}
		)
	}
}