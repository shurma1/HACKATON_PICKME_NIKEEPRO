import tesseract from 'node-tesseract-ocr';

class RecognizeService {
	public async ImageToText(input: string | Buffer): Promise<string> {
		return new Promise((resolve, reject) => {
			tesseract
				.recognize(input)
				.then((text) => {
					resolve(text);
				})
				.catch((error) => {
					reject(error);
				})
		})
	}
}

export default new RecognizeService();