export interface IChoice {
	index: number,
	message: IMessage,
	logprobs: any,
	finish_reason: string
	
}

export interface IMessage {
	role: Role,
	content: string
	refusal: any
}

export enum Role {
	assistant = 'assistant',
	user = 'user',
	system = 'system',
}