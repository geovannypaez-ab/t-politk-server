// eslint-disable-next-line no-console
import express from 'express';
import cors from 'cors';
import path from 'path';
import { routerApp } from './routes';
import swaggerIu from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import config from './config';

import { logErrors,boomErrorHandler,errorHandler,ormErrorHandler } from './middlewaresd/errors.handler';
import { options } from './swagger/options';

const app = express();
app.use(express.json());
app.use(cors());


//para poder servir imagenes

app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
  res.json({ ' message': ' welcome to this API' });
});

// traemos la estrategias de authenticacion
require('./auth/index');

//añadimos todas la rutas a la app
routerApp(app);
//swagger docs 
const specs = swaggerJSDoc(options);
app.use('/api/v1/docs',swaggerIu.serve,swaggerIu.setup(specs));
//middlewares para responder a los errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('server in port' + config.port);
});
