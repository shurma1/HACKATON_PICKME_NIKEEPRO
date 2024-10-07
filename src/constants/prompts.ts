export const textAnalysisPromt = 'Analyze the text and return sentences that reflect the main meaning (no changes, only those that strongly affect the context). Specify the percentage of reliability of each sentence (sentences that are absurd in meaning should have a minimum rating) (from 0 to 1) and a summary in the original language (the presentation should contain the original words, you do not need to replace them with synonyms), written in a narrative style to help find similar news on Google. The resume should be very short, similar to a search query, and contain important details that affect the context. Answer return in JSON format (only json): {sentences: [{sentence: string, chance: float, brief: string}]}. Text for analysis: ';
export const resultRelevancePromt = 'Compare this query with each result and return the percentage of relevance for each of them. The input query must be included in the response or be very close in meaning. Ensure that the relevance check is performed with high accuracy and that the results retain the same value as the query, even if they have a similar negative value. Pay special attention to proper nouns and common nouns, considering the capitalization and potential meanings of words to avoid semantic collisions. Make sure that the meaning is not distorted. Input is 10 sentences, Result must have 10 numbers.  Input data: {query: string, results: ["text of the headline and description from search results"]}. Output should be a JSON object without comments: {relevances: [array of relevance percentages for each article in the results field]}. data: ';