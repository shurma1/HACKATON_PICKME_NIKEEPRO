import {ISentence} from "./ISentence";
import {IResource} from "./IResource";

export interface ISentenceWithAnalysis extends ISentence {
	resources: IResource[];
	totalPages: number;
}