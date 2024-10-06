import config from "config";
import $api from "../api";
import {IChoice, Role} from "../types/IChoice";



class OpenaiService {
	public async GenerateGPT4oMini(prompt: string): Promise<string>{
		const apikey = config.get('openai_api_key');
		try {
			const request = await $api.post('https://api.openai.com/v1/chat/completions', {
				model: 'gpt-4o-mini',
				messages: [
					{
						role: Role.system,
						content: prompt
					}
				],
				temperature: 0.7
			},
				{
					headers: {
						Authorization: 'Bearer ' + apikey,
					}
				})
			const parts = request.data.choices as IChoice[];
			return parts.map((choice) => choice.message.content).join(' ');
			
		} catch (error) {
			console.error('Error fetching GPT-4 response:', error);
			throw error;
		}
	}
}

export default new OpenaiService();