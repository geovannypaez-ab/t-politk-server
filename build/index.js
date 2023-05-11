"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-console
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config_1 = __importDefault(require("./config"));
const errors_handler_1 = require("./middlewaresd/errors.handler");
const options_1 = require("./swagger/options");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//para poder servir imagenes
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.get('/', (req, res) => {
    res.json({ ' message': ' welcome to this API' });
});
// traemos la estrategias de authenticacion
require('./auth/index');
//añadimos todas la rutas a la app
(0, routes_1.routerApp)(app);
//swagger docs 
const specs = (0, swagger_jsdoc_1.default)(options_1.options);
app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
//middlewares para responder a los errores
app.use(errors_handler_1.logErrors);
app.use(errors_handler_1.ormErrorHandler);
app.use(errors_handler_1.boomErrorHandler);
app.use(errors_handler_1.errorHandler);
app.listen(config_1.default.port, () => {
    console.log('server in port' + config_1.default.port);
});
