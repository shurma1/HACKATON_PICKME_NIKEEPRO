import {bot} from '../init/bot';
import TelegramBot from "node-telegram-bot-api";


const AnalysisHandler = async (message: TelegramBot.Message) => {
	console.log(message)
	// await bot.sendSticker(
	// 	message.chat.id,
	// 	HELLO_STIKER_ID
	//
	// )
	
	//await bot.sendMessage(message.chat.id, HELLO_MESSAGE);
}

export {AnalysisHandler}