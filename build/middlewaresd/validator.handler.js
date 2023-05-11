"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRole = exports.RolesMiddleware = exports.validatorHandler = exports.PropertyValidatorHandler = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
var PropertyValidatorHandler;
(function (PropertyValidatorHandler) {
    PropertyValidatorHandler["QUERY"] = "query";
    PropertyValidatorHandler["BODY"] = "body";
    PropertyValidatorHandler["PARAMS"] = "params";
    PropertyValidatorHandler["USER"] = "user";
})(PropertyValidatorHandler = exports.PropertyValidatorHandler || (exports.PropertyValidatorHandler = {}));
// valida los objetos Joi o schemas que le pasemos
const validatorHandler = (eschema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = eschema.validate(data, { abortEarly: false });
        if (error) {
            next(boom_1.default.badRequest(error));
        }
        next();
    };
};
exports.validatorHandler = validatorHandler;
// roles
var RolesMiddleware;
(function (RolesMiddleware) {
    RolesMiddleware["LIDER"] = "lider";
    RolesMiddleware["ADMIN"] = "admin";
})(RolesMiddleware = exports.RolesMiddleware || (exports.RolesMiddleware = {}));
// middleware que validad el role en el token de authenticacion 
const validatorRole = (role) => {
    return (req, res, next) => {
        const payloadToken = req.user;
        const isAuthorized = payloadToken.role === role;
        if (!isAuthorized) {
            next(boom_1.default.unauthorized("No authorizado para pedir estos datos"));
        }
        next();
    };
};
exports.validatorRole = validatorRole;
