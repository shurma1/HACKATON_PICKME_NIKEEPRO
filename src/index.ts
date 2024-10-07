import express from 'express';
import config from 'config';
import path from 'node:path';
import cors from 'cors';
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware';
import {Sequelize} from './model'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
import {initEnv} from './utils/InitEnv';
import {getLocalIp} from './utils/getLocalIp';
import * as http from 'node:http';
import {Logger} from './utils/logger';
import Router from './router';


initEnv();

export const ROOT_DIR = path.resolve(__dirname);
export const isDev = process.env.mode === 'development';

const app = express();

export const server = http.createServer(app);

if(isDev) {
  const specs = YAML.load(path.join(__dirname, '..', 'docs', 'docs.yaml'));
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
}


app.use(cors());
app.use(express.json());
app.use('/api', Router);

app.use(ErrorHandlingMiddleware);

const localIp = getLocalIp();
export const HOST = isDev ? '127.0.0.1' : localIp;

if(! HOST) {
  Logger.error('INVALID HOST IP')
  throw new Error();
}

export const PORT = config.get('server.PORT') as number || 3000
export const ADDRESS = `http://${HOST}:${PORT}`

const start  = async () => {
  await Sequelize.authenticate()
  await Sequelize.sync()
  server.listen(
    PORT,
    HOST as string,
    () => {
      Logger.log(`Server started on ${ADDRESS}`);
      if(isDev) {
        Logger.debug('The server is running in DEVELOPMENT MODE');
        Logger.debug(`DOCS is available at: ${ADDRESS}/api/docs`);
      }
    }
  )
}


start();
