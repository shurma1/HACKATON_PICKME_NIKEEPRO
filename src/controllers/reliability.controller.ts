import {NextFunction, Request, Response} from 'express';
import AnalysisService from "../services/analysis.service";

/**
 * Получение пользователя по id
 * @route GET /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @returns {UserDTO.model} 200 - Вернет пользоввателя.
 * @returns 400 - [USER_NOT_FOUND] - Пользователь не найден.
 */

/**
 * Получение всех пользователей
 * @route GET /api/user
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} limit.query - Лимит и page тут же передаем

 * @returns {UserWithCountDTO.model} 200 - Вернет пользователей с учетом limit и id.
 */


/**
 * Удаление пользователя по id
 * @route DELETE /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @returns 200 - Пользователь удален.
 * @returns 400 - [USER_NOT_FOUND] - Пользователь не найден.
 */

/**
 * Создание пользователя
 * @route POST /api/user
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {SignUpDTO.model} input.body.required
 * @returns {UserDTO.model} 200 - Вернет созданного пользователя.
 */

/**
 * Обновление данных пользователя
 * @route PUT /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @param {SignUpDTO.model} input.body.required
 * @returns {UserDTO.model} 200 - Вернет обновленного пользователя.
 */

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