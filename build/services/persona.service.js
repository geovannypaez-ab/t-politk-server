"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaService = void 0;
const sequelize_1 = require("../db/sequelize");
const sequelize_2 = require("sequelize");
const boom_1 = __importDefault(require("@hapi/boom"));
class PersonaService {
    static getInstance() {
        if (!PersonaService.instancia) {
            PersonaService.instancia = new PersonaService();
        }
        return PersonaService.instancia;
    }
    async getAll(documento_li) {
        return await sequelize_1.models.Persona.findAll({
            where: {
                documento_li
            }
        });
    }
    async updatePersonByLider(documento_pe, documento_li, persona) {
        const personUpdated = await sequelize_1.models.Persona.update(persona, {
            where: {
                [sequelize_2.Op.and]: [
                    { documento_pe },
                    { documento_li }
                ]
            }
        });
        if (!personUpdated[0]) {
            throw boom_1.default.notFound("Persona asociada al lider no encontrada");
        }
        return {
            estado: personUpdated,
            message: "success"
        };
    }
    async getAllByLider(documento_li, acepts = true) {
        const estado = acepts ? 1 : 0;
        const personas = await sequelize_1.models.Persona.findAll({
            where: {
                documento_li,
                estado
            },
            order: [["nombre", "ASC"]]
        });
        return personas;
    }
    async createPersonByLider(documento_li, documento_ad, data) {
        data.documento_li = documento_li;
        data.estado = "0";
        const isLiderWithThisAdmin = await sequelize_1.models.Lider.findOne({
            where: {
                documento_ad,
                documento_li
            }
        });
        const isPerson = await sequelize_1.models.Persona.findOne({
            where: {
                documento_pe: data.documento_pe,
                documento_li: isLiderWithThisAdmin?.documento_li
            }
        });
        if (isPerson && isLiderWithThisAdmin) {
            throw boom_1.default.badRequest('Persona con este documento ya fue registrado.');
        }
        ;
        const newPerson = await sequelize_1.models.Persona.create(data);
        return newPerson;
    }
}
exports.PersonaService = PersonaService;
