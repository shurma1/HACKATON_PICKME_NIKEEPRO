import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { PORT, HOST } from "../../config";
import {IDeepTextAnalyse} from "@/types/IDeepTextAnalyse";
import {ITextAnalysisRequest} from "@/types/ITextAnalysisRequest";

export const API_URL = `http://${HOST}:${PORT}/api`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});


const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	// тут была подмена jwt токена, была...
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		checkReliability: builder.mutation<IDeepTextAnalyse, ITextAnalysisRequest>({
			query: (credentials) => ({
				url: '/reliability/check',
				method: 'POST',
				body: credentials,
			}),
		}),
	})
})

export const {
  	useCheckReliabilityMutation,
} = api;
