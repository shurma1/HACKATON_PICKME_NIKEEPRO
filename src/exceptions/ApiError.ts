import {ERROR_KEYS, errors, ERRORS} from '../constants/errors';
import {ValidationError} from 'express-validator';

class ApiError extends Error{

  status: number;
  description: string;
  errors?: ValidationError[];

  constructor(status: number, message: string, description = '', errors: ValidationError[] = []) {
    super();
    this.status = status;
    this.message = message;
    this.description = description;
    this.errors = errors;
  }

  static BadRequest(message: string,) {
    return new ApiError(404, message);
  }


  static Validation(errors: ValidationError[] = []) {
    return new ApiError(400, 'VALIDATION_ERROR', 'Ошибка валидации, одно или несколько полей не корректны.', errors);
  }

  static Internal(message: string) {
    return new ApiError(500, message);
  }

  static Forbidden(message: string) {
    return new ApiError(403, message);
  }

  static Custom(errorKey: ERROR_KEYS) {
    const error = errors[errorKey];
    return new ApiError(error.code, error.name, error.description);
  }
}

export default ApiError;