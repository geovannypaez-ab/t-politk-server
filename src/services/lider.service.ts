import { models } from "../db/sequelize";
import { WhereOptions, InferAttributes, WhereAttributeHashValue } from "sequelize";
import boom from '@hapi/boom'
import { Lider } from "../db/models/lider.model";
import { Op } from "sequelize";
import crypto from 'crypto';
export interface QueryLider {
    acepts?: boolean
}
export class LiderService {
    private static instancia: LiderService;
    public static getInstancia() {
        if (!LiderService.instancia) {
            LiderService.instancia = new LiderService();
        }
        return LiderService.instancia;
    }
    async getAll() {
        return await models.Lider.findAll();
    }
    async getLiderByDocument(documento_li:string,documento_ad:string){
        return await models.Lider.findOne({
            where:{
                documento_ad,
                documento_li
            },
            attributes:{exclude:["contrasena"]}
        });
    }
    async getLider(username: string) {
        const lider = await models.Lider.findOne({
            where: { usuario: username, estado: 1 }
        });
        return lider;
    }
    async getByAdmin(documento_ad: string, query: QueryLider | undefined = undefined):Promise<Lider[]> {
        let where: WhereOptions<InferAttributes<Lider, { omit: never }>>
        if (query) {
            const estado: WhereAttributeHashValue<string> = query.acepts ? "1" : "0";
            where = {
                [Op.and]: [
                    { documento_ad },
                    { estado }
                ],
            }
        } else {
            where = {
                documento_ad
            }
        }
        const lideresData = await models.Lider.findAll({
            where,
            order: [['nombre', "ASC"]],
            attributes: { exclude: ['contrasena'] },
        });
        const lideres = await Promise.all(lideresData.map(async (lider) => {
            const votantes = await models.Persona.findAll({
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

        return lideres as Lider[];
    }

    // eliminar lider por el adminstrador
    async deleteByAdmin(documento_ad: string, documento_li: string) {
        const lideres = await this.getByAdmin(documento_ad);
        const lider = await models.Lider.findOne({
            where: {
                documento_li
            }
        });
        // console.log(lideres.length);
        if (!lider) {
            throw boom.notFound();
        }
        const isLiderOfAdmin = lideres.some(li => li.documento_li === lider.documento_li);
        if (isLiderOfAdmin) {
            const res = await models.Lider.destroy({
                where: {
                    documento_li: lider.documento_li
                }
            });
            return { message: 'lider ha si eliminado', res }
        } else {
            throw boom.badRequest('solo el admin que tenga este lider lo podra eliminar');
        }
    }
    // crear lider por el adminstrador
    async createLiderByAdmin(documento_ad: string, lider: Lider) {
        lider.documento_ad = documento_ad;
        //hasheo de contraseña
        const hash = crypto.createHash('sha512').update(lider.contrasena).digest('hex');
        lider.contrasena = hash;

        const newLider = await models.Lider.create(lider);
        // no retornamos contraseña
        const { contrasena, ...liderSinContrasena } = newLider.dataValues;
        return { message: "Lider ha sido creado correctamente", lider: liderSinContrasena };
    }

    // actualizar campos del lider para el adminstrador
    async updateLiderByAdmin(documento_ad: string, documento_li: string, lider: Lider) {
        const liderUpdated = await models.Lider.update(lider, {
            where: {
                [Op.and]: [
                    { documento_ad },
                    { documento_li }
                ]
            }
        })
        if (!liderUpdated[0]) {
            throw boom.notFound("lider asociado al administrador no encontrado")
        }
        return {
            estado: liderUpdated,
            message: "success"
        }
    }
}