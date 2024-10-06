const express = require('express');
const ExpressSwaggerGenerator = require('express-swagger-generator');
const swaggerOptions = require('../config/swagger.options.js');
const {fileURLToPath} = require('url');
const jsonToYaml = require('json2yaml');
const fs = require('fs');
const swaggerConverter = require('swagger2openapi');

// Привязка генератора к конкретному экземпляру приложения Express
const expressSwaggerGenerator = ExpressSwaggerGenerator(express());

// Генерирование документации по определённым настройкам
const swaggerDoc = expressSwaggerGenerator(swaggerOptions(__dirname));

// Синхронная запись данных в файл документации
fs.writeFileSync('./docs/docs_swagger2.yaml', jsonToYaml.stringify(swaggerDoc));

// Процесс конвертации документации в формате Swagger 2 в документацию формата OpenAPI 3
swaggerConverter.convertObj(swaggerDoc, {}, (err, options) => {
  if (err) {
    console.error(err);
  } else {
    // Конвертация JSON в YAML
    const output = jsonToYaml.stringify(options.openapi);

    // Запись результата конвертации документации в файл (он в дальнейшем и используется по умолчанию для вывода документации)
    fs.writeFileSync('./docs/docs.yaml', output);
    process.exit(0);
  }
});