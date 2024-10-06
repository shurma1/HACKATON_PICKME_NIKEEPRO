import {bot} from './init/bot';

import {
	MessageHandler,
} from './handlers/message.handler';


bot.on('message', MessageHandler)