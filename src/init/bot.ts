import TelegramBot from 'node-telegram-bot-api';
import {BOT_API_KEY} from '../config';

const bot = new TelegramBot(BOT_API_KEY, {
	polling: {
		interval: 300,
		autoStart: true
	}
})

export {bot}