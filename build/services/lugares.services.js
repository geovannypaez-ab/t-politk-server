"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LugarService = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const lider_service_1 = require("./lider.service");
const liderService = lider_service_1.LiderService.getInstancia();
class LugarService {
    // retorna los lugares en los cual el administrador puede crear un nuevo lide en el formulario añadir lider.
    async getLugarByAdmin(documento_ad) {
        let lugares;
        const admin = await sequelize_2.models.Administrador.findOne({
            where: {
                documento_ad
            }
        });
        // lugares del candidato departamental
        if (admin?.tipocandidatura === 1) {
            const DepTipocandi = await sequelize_2.models.DepTipocandi.findOne({
                where: {
                    documento_ad: admin.documento_ad
                }
            });
            lugares = await sequelize_2.models.Municipio.findAll({
                where: {
                    id_dep: DepTipocandi?.id_dep
                }
            });
        }
        else {
            //lugures del candidato municipal
            const muniTipocandi = await sequelize_2.sequelize.query('SELECT  `id_muni`, `id_tc`, `documento_ad` FROM `muni_tipocandi` AS `MuniTipocandi` WHERE documento_ad = :admin_dc', {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: {
                    admin_dc: documento_ad
                }
            });
            if (muniTipocandi.length > 0) {
                lugares = [await sequelize_2.models.Municipio.findOne({
                        where: {
                            id_muni: muniTipocandi[0].id_muni
                        }
                    })];
            }
        }
        return { lugares };
    }
    // retorna los lugares para que el lider pueda registrar una nueva persona en el formulario de registrar persona
    async getLugaresByLider(documento_li, documento_ad) {
        const lider = await sequelize_2.models.Lider.findOne({
            where: {
                documento_ad,
                documento_li
            }
        });
        const municipio = await sequelize_2.models.Municipio.findOne({
            where: {
                id_muni: lider?.id_muni
            }
        });
        const departamento = await sequelize_2.models.Departamento.findOne({
            where: {
                id_dep: municipio?.id_dep
            }
        });
        const barrios = await sequelize_2.models.Barrio.findAll({
            where: {
                id_muni: municipio?.id_muni
            }
        });
        const puestosVotacion = await sequelize_2.models.PuestoVotacion.findAll({
            where: {
                id_dep: departamento?.id_dep
            }
        });
        return {
            message: "Lugares para que el lider pueda hacer registro registro de un nuevo votante.",
            municipio,
            departamento,
            puestosVotacion,
            barrios
        };
    }
}
exports.LugarService = LugarService;
