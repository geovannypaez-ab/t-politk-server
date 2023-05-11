"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiderService = void 0;
const sequelize_1 = require("../db/sequelize");
const boom_1 = __importDefault(require("@hapi/boom"));
const sequelize_2 = require("sequelize");
const crypto_1 = __importDefault(require("crypto"));
class LiderService {
    static getInstancia() {
        if (!LiderService.instancia) {
            LiderService.instancia = new LiderService();
        }
        return LiderService.instancia;
    }
    async getAll() {
        return await sequelize_1.models.Lider.findAll();
    }
    async getLiderByDocument(documento_li, documento_ad) {
        return await sequelize_1.models.Lider.findOne({
            where: {
                documento_ad,
                documento_li
            },
            attributes: { exclude: ["contrasena"] }
        });
    }
    async getLider(username) {
        const lider = await sequelize_1.models.Lider.findOne({
            where: { usuario: username, estado: 1 }
        });
        return lider;
    }
    async getByAdmin(documento_ad, query = undefined) {
        let where;
        if (query) {
            const estado = query.acepts ? "1" : "0";
            where = {
                [sequelize_2.Op.and]: [
                    { documento_ad },
                    { estado }
                ],
            };
        }
        else {
            where = {
                documento_ad
            };
        }
        const lideresData = await sequelize_1.models.Lider.findAll({
            where,
            order: [['nombre', "ASC"]],
            attributes: { exclude: ['contrasena'] },
        });
        const lideres = await Promise.all(lideresData.map(async (lider) => {
            const votantes = await sequelize_1.models.Persona.findAll({
                where: {
                    documento_li: lider.documento_li,
                    estado: 1
                },
                attributes: { exclude: ['id_bar', 'fecha', 'estado'] }
            });
            return { ...lider.dataValues, personas: votantes };
        }));
        // console.log(lideres)
        // return lideresData ;
        return lideres;
    }
    // eliminar lider por el adminstrador
    async deleteByAdmin(documento_ad, documento_li) {
        const lideres = await this.getByAdmin(documento_ad);
        const lider = await sequelize_1.models.Lider.findOne({
            where: {
                documento_li
            }
        });
        // console.log(lideres.length);
        if (!lider) {
            throw boom_1.default.notFound();
        }
        const isLiderOfAdmin = lideres.some(li => li.documento_li === lider.documento_li);
        if (isLiderOfAdmin) {
            const res = await sequelize_1.models.Lider.destroy({
                where: {
                    documento_li: lider.documento_li
                }
            });
            return { message: 'lider ha si eliminado', res };
        }
        else {
            throw boom_1.default.badRequest('solo el admin que tenga este lider lo podra eliminar');
        }
    }
    // crear lider por el adminstrador
    async createLiderByAdmin(documento_ad, lider) {
        lider.documento_ad = documento_ad;
        //hasheo de contraseña
        const hash = crypto_1.default.createHash('sha512').update(lider.contrasena).digest('hex');
        lider.contrasena = hash;
        const newLider = await sequelize_1.models.Lider.create(lider);
        // no retornamos contraseña
        const { contrasena, ...liderSinContrasena } = newLider.dataValues;
        return { message: "Lider ha sido creado correctamente", lider: liderSinContrasena };
    }
    // actualizar campos del lider para el adminstrador
    async updateLiderByAdmin(documento_ad, documento_li, lider) {
        const liderUpdated = await sequelize_1.models.Lider.update(lider, {
            where: {
                [sequelize_2.Op.and]: [
                    { documento_ad },
                    { documento_li }
                ]
            }
        });
        if (!liderUpdated[0]) {
            throw boom_1.default.notFound("lider asociado al administrador no encontrado");
        }
        return {
            estado: liderUpdated,
            message: "success"
        };
    }
}
exports.LiderService = LiderService;
