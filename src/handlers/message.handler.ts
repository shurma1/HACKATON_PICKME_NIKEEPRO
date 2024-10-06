import TelegramBot from "node-telegram-bot-api";
import {StartMessageHandler} from "./startMessage.handler";
import {AnalysisHandler} from "./analysis.handler";

const MessageHandler = async (message: TelegramBot.Message) => {
	
	switch (message.text) {
		case '/start': {
			await StartMessageHandler(message);
			break;
		}
		default: {
			await AnalysisHandler(message)
		}
		
	}
}

export {MessageHandler}