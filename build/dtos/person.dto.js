"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedPersonDto = exports.createPersonDto = void 0;
const joi_1 = __importDefault(require("joi"));
// Definir la función personalizada para validar la fecha de nacimiento para que sea mayor de edads
const isDateOfBirthValid = (value, helpers) => {
    const age = Math.floor((Date.now() - new Date(value).getTime()) / 31557600000);
    if (age < 18) {
        return helpers.error("debe ser mayor de edad", {
            label: "debe ser mayor de edad",
            "value": "value"
        });
    }
    return value;
};
// dto para poder crear personas
const createPersonDto = joi_1.default.object({
    documento_pe: joi_1.default.string().max(15).required(),
    nombre: joi_1.default.string().max(20).required(),
    apellido: joi_1.default.string().max(20).required(),
    email: joi_1.default.string().email().max(50),
    fecha_naci: joi_1.default.date().custom(isDateOfBirthValid, 'custom validation').required(),
    puesto_votacion: joi_1.default.string().required(),
    genero: joi_1.default.string().min(5).required(),
    telefono: joi_1.default.string().max(11).required(),
    id_bar: joi_1.default.string().required(),
});
exports.createPersonDto = createPersonDto;
//dto para poder actualizar los datos de una persona
const updatedPersonDto = joi_1.default.object({
    documento_pe: joi_1.default.string().max(15),
    documento_li: joi_1.default.string().max(15),
    fecha_naci: joi_1.default.date(),
    nombre: joi_1.default.string().max(20),
    apellido: joi_1.default.string().max(20),
    genero: joi_1.default.string().max(15),
    id_bar: joi_1.default.number().integer(),
    email: joi_1.default.string().email().max(50),
    telefono: joi_1.default.string().max(11),
    puesto_votacion: joi_1.default.string().max(100),
    estado: joi_1.default.string().max(1).required()
});
exports.updatedPersonDto = updatedPersonDto;
