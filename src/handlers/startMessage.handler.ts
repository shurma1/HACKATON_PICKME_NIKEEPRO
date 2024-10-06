import {bot} from '../init/bot';
import TelegramBot from "node-telegram-bot-api";

import {
	HELLO_MESSAGE,
	HELLO_STIKER_ID
} from '../config';


const StartMessageHandler = async (message: TelegramBot.Message) => {
	await bot.sendSticker(
		message.chat.id,
		HELLO_STIKER_ID
	)
	await bot.sendMessage(message.chat.id, HELLO_MESSAGE);
}

export {StartMessageHandler}