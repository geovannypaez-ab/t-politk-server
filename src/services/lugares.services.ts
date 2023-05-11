
import { QueryTypes } from "sequelize";
import { MuniTipocandi } from "../db/models/muni_tipocandi.model";
import { models, sequelize } from "../db/sequelize";
import { LiderService } from "./lider.service";
const liderService = LiderService.getInstancia();

export class LugarService {
    // retorna los lugares en los cual el administrador puede crear un nuevo lide en el formulario añadir lider.
    async getLugarByAdmin(documento_ad: string) {
        let lugares;
        const admin = await models.Administrador.findOne({
            where: {
                documento_ad
            }
        });
        // lugares del candidato departamental
        if (admin?.tipocandidatura === 1) {
            const DepTipocandi = await models.DepTipocandi.findOne({
                where: {
                    documento_ad: admin.documento_ad
                }
            });
            lugares = await models.Municipio.findAll({
                where: {
                    id_dep: DepTipocandi?.id_dep
                }
            });
        } else {
            //lugures del candidato municipal
            const muniTipocandi = await sequelize.query<MuniTipocandi>('SELECT  `id_muni`, `id_tc`, `documento_ad` FROM `muni_tipocandi` AS `MuniTipocandi` WHERE documento_ad = :admin_dc', {
                type: QueryTypes.SELECT,
                replacements: {
                    admin_dc: documento_ad
                }
            });
            if (muniTipocandi.length > 0) {
                lugares = [await models.Municipio.findOne({
                    where: {
                        id_muni: muniTipocandi[0].id_muni
                    }
                })]
            }
            
        }
        return { lugares }
    }
    // retorna los lugares para que el lider pueda registrar una nueva persona en el formulario de registrar persona
 async getLugaresByLider(documento_li:string,documento_ad:string){
        const lider = await models.Lider.findOne({
            where:{
                documento_ad,
                documento_li
            }
        });
        const municipio = await models.Municipio.findOne({
            where:{
                id_muni:lider?.id_muni
            }
        });
        const departamento = await models.Departamento.findOne({
            where:{
                id_dep:municipio?.id_dep
            }
        });
        const barrios = await models.Barrio.findAll({
            where:{
                id_muni:municipio?.id_muni
            }
        });
        const puestosVotacion = await models.PuestoVotacion.findAll({
            where:{
                id_dep:departamento?.id_dep
            }
        });
        return {
            message:"Lugares para que el lider pueda hacer registro registro de un nuevo votante.",
            municipio,
            departamento,
            puestosVotacion,
            barrios
        }
    }
}