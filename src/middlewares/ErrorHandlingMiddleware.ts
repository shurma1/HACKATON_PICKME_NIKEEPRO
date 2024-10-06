import ApiError from '../exceptions/ApiError';
import {Request, Response, NextFunction} from 'express';
import {Logger} from '../utils/logger';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  Logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status)
    .json(
      {
        code: err.message,
        description: err.description,
        errors: err.errors
      }
    )
  }
  return res.status(500)
  .json(
    {
      message: 'Unknown error.'
    }
  )
}