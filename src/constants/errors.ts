export const errors = {
  TEXT_EMPTY: {
    name: 'TEXT_EMPTY',
    description: 'Поле text пустое.',
    code: 400
  },
  INVALID_TEXT_TYPE: {
	name: 'INVALID_TEXT_TYPE',
	description: 'Поле text должно иметь тип string.',
	code: 400
  },
  INVALID_PARAM_TYPE: {
	name: 'INVALID_PARAM_TYPE',
	description: 'Поля trust, resourceQuality, logic принимают занчения от 0.0f до 1.0f',
	code: 400
  },
  INVALID_INPUT_TEXT_LENGTH: {
	name: 'INVALID_INPUT_TEXT_LENGTH',
	description: 'Текст не должен быть длинее 350 символов',
	code: 400
  },
}


export type ERROR_KEYS = keyof typeof errors;
export type ERRORS = typeof errors[ERROR_KEYS];