import {NextFunction, Request, Response} from 'express';
import AnalysisService from "../services/analysis.service";


class ReliabilityController {
  async Check(req: Request, res: Response, next: NextFunction){
    try{
      let {
		  text,
		  trust,
		  resourceQuality,
		  logic
	  } = req.body;
	  	
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