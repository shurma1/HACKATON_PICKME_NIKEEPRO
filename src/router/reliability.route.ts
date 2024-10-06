import express from 'express';
import {body} from 'express-validator';
import {errors} from '../constants/errors';
import checkValidationErrors from '../middlewares/checkValidationErrors';
import ReliabilityController from "../controllers/reliability.controller";
const router = express.Router();

router.post('/check',
  body('text').notEmpty().withMessage(errors.TEXT_EMPTY.description).isString().withMessage(errors.INVALID_TEXT_TYPE.description),
  checkValidationErrors,
  ReliabilityController.Check
)


export default router;