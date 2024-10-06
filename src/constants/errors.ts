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
}


export type ERROR_KEYS = keyof typeof errors;
export type ERRORS = typeof errors[ERROR_KEYS];