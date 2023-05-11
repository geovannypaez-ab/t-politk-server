import express,{Express} from 'express';

import routerAuth from './auth/auth.rotue';
import routeAdmin from './user/userInfo.route';
import routeLider from './lider.route';
import imageRoute from './images.route';
import luagarRoute from './lugar.route';
import estadisticasRoute from './estadisticas/estadisticas.route'
import personaRoute from './persona.route';

//funcion que crea todas las rutas de la api
export const routerApp = ( app: Express )=> {
    const router = express.Router();
    app.use('/api/v1', router);
    //ejemplo:
    //http://doiminiox.com/api/v1/...resto de rutas
    router.use('/auth',routerAuth);
    router.use('/user',routeAdmin);
    router.use('/lider',routeLider);
    router.use('/images',imageRoute);
    router.use('/lugar',luagarRoute);
    router.use('/estadisticas',estadisticasRoute);
    router.use('/persona',personaRoute);
}