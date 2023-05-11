"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.models = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const models_1 = require("./models");
const options = {
    dialect: 'mysql',
    logging: config_1.default.isDev ? console.log : false
};
// if (config.isprod) {   
//     options.dialectOptions = {
//         ssl: { rejectUnauthorized: false }
//     }
// }
const sequelize = new sequelize_1.Sequelize(config_1.default.dbUrl, options);
exports.sequelize = sequelize;
const isConect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
// la pasamos los modelos o tablas a la intancia de sequelize
const models = (0, models_1.setupModels)(sequelize);
exports.models = models;
//nos conecamos a la db
isConect().then();
