"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedLiderDto = exports.paramUpdatedLiderDto = exports.createLiderDto = void 0;
const joi_1 = __importDefault(require("joi"));
// dto para validar el body al momento de crear un lider
const createLiderDto = joi_1.default.object({
    documento_li: joi_1.default.string().max(15).required(),
    nombre: joi_1.default.string().max(20).required(),
    apellido: joi_1.default.string().max(20).required(),
    email: joi_1.default.string().email().max(50),
    fecha_naci: joi_1.default.date(),
    telefono: joi_1.default.string().max(11).required(),
    id_muni: joi_1.default.number().integer().required(),
    usuario: joi_1.default.string().max(15).required(),
    contrasena: joi_1.default.string().min(6).required(),
    imagen: joi_1.default.string().max(600),
    descripcion: joi_1.default.string().max(350),
    fecha: joi_1.default.date(),
    monto: joi_1.default.number().integer(),
    estado: joi_1.default.number().integer().max(2).required(),
});
exports.createLiderDto = createLiderDto;
// valida las propiedades para poder actualizar los datos de un lider
const updatedLiderDto = joi_1.default.object({
    // documento_li: Joi.string().max(15).required(),
    nombre: joi_1.default.string().max(20),
    apellido: joi_1.default.string(),
    email: joi_1.default.string().email(),
    fecha_naci: joi_1.default.date(),
    telefono: joi_1.default.string().max(11),
    id_muni: joi_1.default.number().integer(),
    usuario: joi_1.default.string().max(15),
    contrasena: joi_1.default.string().max(600),
    imagen: joi_1.default.string().max(600),
    descripcion: joi_1.default.string().max(350),
    fecha: joi_1.default.date(),
    monto: joi_1.default.number().integer(),
    estado: joi_1.default.number().integer().max(2),
});
exports.updatedLiderDto = updatedLiderDto;
// valida el parametro que de documento_li el valor sea un numero
const paramUpdatedLiderDto = joi_1.default.object({
    documento_li: joi_1.default.number().required()
});
exports.paramUpdatedLiderDto = paramUpdatedLiderDto;
