"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const lider_service_1 = require("./lider.service");
const liderService = lider_service_1.LiderService.getInstancia();
//patron de diseño singleto
class AdminService {
    static getInstacia() {
        if (!AdminService.instancia) {
            AdminService.instancia = new AdminService();
        }
        return AdminService.instancia;
    }
    async getAll() {
        return await sequelize_2.models.Administrador.findAll();
    }
    async getAdminByUsername(usuario) {
        const admin = await sequelize_2.models.Administrador.findOne({
            where: {
                usuario
            },
        });
        return admin;
    }
    async getOne(documento_ad) {
        const admin = await sequelize_2.models.Administrador.findOne({
            where: {
                documento_ad
            },
            attributes: { exclude: ['contrasena'] }
        });
        const candidatura = await sequelize_2.models.Tipocandi.findOne({
            where: {
                id: admin?.tipocandidatura
            }
        });
        const partido = await sequelize_2.models.Partido.findByPk(admin?.partido);
        const lideres = await liderService.getByAdmin(documento_ad);
        const listDocumentsLiders = lideres.map(lider => lider.documento_li);
        // console.log(listDocumentsLiders)
        const countPersons = await sequelize_2.models.Persona.count({
            where: {
                estado: 1,
                documento_li: {
                    [sequelize_1.Op.or]: [...listDocumentsLiders]
                }
            }
        });
        return { ...admin?.dataValues, votos: countPersons, candidatura, infoPartido: partido?.dataValues };
    }
}
exports.AdminService = AdminService;
