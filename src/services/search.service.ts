import config from 'config';


import ApiError from '../exceptions/ApiError';
import {Logger} from "../utils/logger";
import axios from "axios";
import RecognizeService from "./recognize.service";
import api from "../api";
import $api from "../api";
import {IGoggleSearch} from "../types/IGoggleSearch";

class SearchService {
  public async Search(query: string): Promise<IGoggleSearch> {
	  const googleApiKey = config.get('google.api_key');
	  const googleCx = config.get('google.cx');
	  console.log('q ' + query)
	  const response = await $api.get('https://customsearch.googleapis.com/customsearch/v1', {
		  params: {
			  key: googleApiKey,
			  cx: googleCx,
			  q: query,
		  }
	  });
	  
	  return response.data as IGoggleSearch;
  }

  public async GetWebQualityIndex(domain: string) {
	  try{
		  const recognizeString = await RecognizeService.ImageToText('https://yandex.ru/cycounter?' + domain);
		  const onlyDigits = recognizeString.replace(/[^0-9]/g, '');
		  console.log(onlyDigits)
		  return parseInt(onlyDigits);
	  }
	  catch {
		  return 0;
	  }
	  
	  
  }
}

export default new SearchService();