import {bot} from '../init/bot';
import TelegramBot from "node-telegram-bot-api";
import CheckTextService from "../service/checkText.service";
import {analyseTemplate} from "../template/analyse.template";

const AnalysisHandler = async (message: TelegramBot.Message) => {
	if(message.text === undefined) {
		return;
	}
	
	try{
		await bot.sendChatAction(message.chat.id, 'typing');
		const answer = await CheckTextService.Check(message.text);
		await bot.sendMessage(
			message.chat.id,
			analyseTemplate(answer),
			{
				parse_mode: 'HTML',
				disable_web_page_preview: true
			});
	}
	catch(err){
		console.log(err)
		await bot.sendMessage(message.chat.id, 'Произошла ошибка, попробуй еще раз');
	}
}

export {AnalysisHandler}