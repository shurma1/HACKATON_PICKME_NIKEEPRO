import config from 'config';

const isDev = true;

export const enum LOGGER_STYLES {
    reset = '\x1b[0m',
    reverse = '\x1b[7m',
    hidden = '\x1b[8m',
    black = '\x1b[30m',
    red = '\x1b[31m',
    green = '\x1b[32m',
    yellow = '\x1b[33m',
    blue = '\x1b[34m',
    white = '\x1b[37m'
}

export enum LogTypes {
    None = 0,
    Error = 1,
    Warning = 2,
    Log = 3,
    Debug = 4
}


const LogColors = {
	[LogTypes.None]: LOGGER_STYLES.reset,
	[LogTypes.Error]: LOGGER_STYLES.red,
	[LogTypes.Warning]: LOGGER_STYLES.yellow,
	[LogTypes.Log]: LOGGER_STYLES.blue,
	[LogTypes.Debug]: LOGGER_STYLES.green
};



export class Logger {
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	static debug(...message: any){
		if(! isDev) return;
		if(! this.checkLoggingLevel(LogTypes.Debug)) return;
		console.log(this.addPrefix(LogTypes.Debug), ...message);
	}
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	static log(...message: any){
		if(! isDev) return;
		if(! this.checkLoggingLevel(LogTypes.Log)) return;
		console.log(this.addPrefix(LogTypes.Log), ...message);
	}
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	static warn(...message: any){
		if(! isDev) return;
		if(! this.checkLoggingLevel(LogTypes.Warning)) return;
		console.log(this.addPrefix(LogTypes.Warning), ...message);
	}
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	static error(...message: any){
		if(! isDev) return;
		if(! this.checkLoggingLevel(LogTypes.Error)) return;
		console.log(this.addPrefix(LogTypes.Error), ...message);
	}

	private static getPrefix(logType: LogTypes): string {
		for (const key in LogTypes) {
			if (key === logType.toString()) {
				return LogTypes[key];
			}
		}
		return 'null';
	}

	private static addTime(message: string): string {
		const date = new Date();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `[${hours}:${minutes}:${seconds}] ${message}`;
	}

	private static addPrefix(logType: LogTypes): string {
		const prefix = this.getPrefix(logType);
		const styledPrefix = this.getStyledText(prefix, LogColors[logType]);
		return this.addTime(`[${styledPrefix}]`);
	}

	private static getStyledText(text: string, color: string): string {
		return `${color}${text}${LOGGER_STYLES.reset}`;
	}

	private static checkLoggingLevel(loggingLevel: LogTypes): boolean {
		const environmentLoggingLevel: LogTypes = config.get('logging.level') || 0;
		return loggingLevel <= environmentLoggingLevel;
	}
}
