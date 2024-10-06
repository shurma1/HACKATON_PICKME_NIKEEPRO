import ApiError from '../exceptions/ApiError';
import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {Logger} from "../utils/logger";



export default async function(req: Request, res: Response, next: NextFunction) {
  try{
    const errors = validationResult(req);
	  Logger.error(errors);
    if (!errors.isEmpty()) {
      return next(ApiError.Validation(errors.array()))
    }
      
    next();
  }
  catch (err) {
    next(err);
  }
}
