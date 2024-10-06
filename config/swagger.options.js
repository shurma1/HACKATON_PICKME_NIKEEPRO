
const options = (dirname) => {
  return {
    swaggerDefinition: {
      info: {
        title: 'Сервис контроля качества',
        description: 'Данный сервис определяет основные API методы',
        version: '1.0.0',
        contact: {
          name: 'Dmitriy Prokhorov',
          email: 'dmitriy.prokhorov.04@gmail.com',
        }
      },
      host: 'localhost:8080',
      basePath: '/',
      produces: [
        'application/json',
      ],
      schemes: ['http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        }
      },
    },
    route: {
      url: '/docs/swagger2',
      docs: '/swagger.json',
    },
    basedir: dirname,
    files: ['../src/routes/*.ts', '../src/dtos/**/*.ts', '../src/controllers/**/*.ts', '../src/exceptions/*.ts']
  };
}

// eslint-disable-next-line no-undef
module.exports = options;