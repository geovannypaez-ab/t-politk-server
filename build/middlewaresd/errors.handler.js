"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormErrorHandler = exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const sequelize_1 = require("sequelize");
const boom_1 = require("@hapi/boom");
const config_1 = __importDefault(require("../config"));
//logea los errores que ocurran
const logErrors = (error, req, res, next) => {
    //log erros if  app is in mode development
    if (config_1.default.isDev) {
        console.error(error);
    }
    next(error);
};
exports.logErrors = logErrors;
// recibe el error que le mandemos y lo responde
const errorHandler = (error, req, res, next) => {
    res.json({
        message: error.message,
        stack: error.stack
    }).status(500);
};
exports.errorHandler = errorHandler;
// responde a los errores que pertenescan a la libreria boom
const boomErrorHandler = (error, req, res, next) => {
    if ((0, boom_1.isBoom)(error)) {
        const { output } = error;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(error);
    }
};
exports.boomErrorHandler = boomErrorHandler;
// responde a los errores que pertenescan a la libreria sequelize
const ormErrorHandler = (error, req, res, next) => {
    if (error instanceof sequelize_1.ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: error.message,
            errors: error.errors
        });
    }
    else {
        next(error);
    }
};
exports.ormErrorHandler = ormErrorHandler;
