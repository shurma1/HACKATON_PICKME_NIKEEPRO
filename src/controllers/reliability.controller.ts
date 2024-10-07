import {NextFunction, Request, Response} from 'express';
import AnalysisService from "../services/analysis.service";
import {MAX_INPUT_TEXT_LENGTH} from "../constants/constants";
import ApiError from "../exceptions/ApiError";


class ReliabilityController {
  async Check(req: Request, res: Response, next: NextFunction){
    try{
      let {
		  text,
		  trust,
		  resourceQuality,
		  logic
	  } = req.body;
	  
	  if(text !== undefined && text.length && text.length > MAX_INPUT_TEXT_LENGTH) {
		  throw ApiError.Custom('INVALID_INPUT_TEXT_LENGTH')
	  }
	  
	  const isNumInRange = (num: number, from: number, to: number) => {
		  if(num >= from && num <= to ) {
			  return true;
		  }
		  return false;
	  }
	  
	  if(trust !== undefined && !isNumInRange(trust, 0, 1)) {
		  throw ApiError.Custom('INVALID_PARAM_TYPE')
	  }
		
	  if(logic !== undefined && !isNumInRange(logic, 0, 1)) {
			throw ApiError.Custom('INVALID_PARAM_TYPE')
	  }
		
	  if(resourceQuality !== undefined && !isNumInRange(resourceQuality, 0, 1)) {
			throw ApiError.Custom('INVALID_PARAM_TYPE')
	  }
	  
	  trust = trust || 0.5;
	  resourceQuality = resourceQuality || 0.5;
	  logic = logic || 0.5;
		
	  const essence = await AnalysisService.DeepTextAnalysis(text, logic, resourceQuality, logic);
		
      res.json(essence);
    }
    catch (e){
      next(e);
    }
  }
}

export default new ReliabilityController();