"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApp = void 0;
const express_1 = __importDefault(require("express"));
const auth_rotue_1 = __importDefault(require("./auth/auth.rotue"));
const userInfo_route_1 = __importDefault(require("./user/userInfo.route"));
const lider_route_1 = __importDefault(require("./lider.route"));
const images_route_1 = __importDefault(require("./images.route"));
const lugar_route_1 = __importDefault(require("./lugar.route"));
const estadisticas_route_1 = __importDefault(require("./estadisticas/estadisticas.route"));
const persona_route_1 = __importDefault(require("./persona.route"));
//funcion que crea todas las rutas de la api
const routerApp = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    //ejemplo:
    //http://doiminiox.com/api/v1/...resto de rutas
    router.use('/auth', auth_rotue_1.default);
    router.use('/user', userInfo_route_1.default);
    router.use('/lider', lider_route_1.default);
    router.use('/images', images_route_1.default);
    router.use('/lugar', lugar_route_1.default);
    router.use('/estadisticas', estadisticas_route_1.default);
    router.use('/persona', persona_route_1.default);
};
exports.routerApp = routerApp;
