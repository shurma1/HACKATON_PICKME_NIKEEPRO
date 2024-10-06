## deFacto - mvp that allows you to recognize disinformation

Developing
-------------

Install dependencies with:
```lang=bash
pnpm install
```

Install system dependencies:

#### Ubuntu
```lang=bash
sudo apt-get install tesseract-ocr
```
#### MacOS
```lang=bash
brew install tesseract
```
This will install all the needed dependencies.

Run
-------------

#### Setting
change settings in `config/default.json`
```json
{
  ...
  "openai_api_key": "<OPENAI API_KEY>",
  "google": {
    "api_key": "<GOOGLE SEARCH API KEY see: https://developers.google.com/custom-search/v1/introduction>",
    "cx": "<GOOGLE ENGINE cx_id see: https://cse.google.com/all>"
  },
  ...
  "socks_config": "<SOCKS PROXY SETTING_LINK>"
}
```

#### Run in Dev-mode
```lang=bash
npm run start:dev
```
#### Run in Prod-mode
```lang=bash
npm run build
npm start
```

How its work
-------------

#### query parameters
* **text: string**: Text to analysis LOL (*required*)
* **trust: float (from 0.0f to 1.0f)**: Increases the rating of trusted sites and reduces the rating of sites from the blacklist
* **resourceQuality: float (from 0.0f to 1.0f)**: The quality of the analyzed sources
* **logic: float (from 0.0f to 1.0f)**: Analysis of the logic of the statement