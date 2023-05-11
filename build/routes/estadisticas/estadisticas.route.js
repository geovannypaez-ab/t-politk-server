"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estadisticas_service_1 = require("../../services/estadisticas.service");
const passport_1 = __importDefault(require("passport"));
const validator_handler_1 = require("../../middlewaresd/validator.handler");
const route = express_1.default.Router();
const service = new estadisticas_service_1.EstadisticasService();
// datos para las session de estadistica
route.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const response = await service.getData(documento_ad);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = route;
