import {IResource} from "./IResource";

export interface ISentence {
	sentence: string,
	chance: number,
	brief: string,
	totalPages: number,
	resources: IResource[]
}